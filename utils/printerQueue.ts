import { supabase } from '../lib/supabaseClient'

/**
 * Calculate a job's position in the queue and estimated completion time.
 * It looks at all jobs with status 'queued' or 'running', ordered by queued_at.
 * Returns { position: number, estCompletion: Date }
 */
export async function getQueueInfo(jobId: string) {
  // Fetch all active jobs sorted by queued_at
  const { data: jobs, error } = await supabase
    .from('printer_queue')
    .select('id,queued_at,estimated_dur,status')
    .in('status', ['queued', 'running'])
    .order('queued_at', { ascending: true })

  if (error) throw new Error(error.message)
  if (!jobs) throw new Error('No jobs found')

  // Find index of our job
  const position = jobs.findIndex((j) => j.id === jobId) + 1 // 1‑based

  // Sum durations of all jobs before this one (including any running job's remaining time)
  let totalMinutes = 0
  for (let i = 0; i < position - 1; i++) {
    const j = jobs[i]
    if (j.status === 'running') {
      // Estimate remaining time for a running job
      const started = new Date(j.queued_at)
      const elapsed = (Date.now() - started.getTime()) / 60000 // minutes
      const remaining = Math.max(j.estimated_dur - elapsed, 0)
      totalMinutes += remaining
    } else {
      totalMinutes += j.estimated_dur
    }
  }

  // Estimated completion for our job
  const estCompletion = new Date(Date.now() + totalMinutes * 60000)
  return { position, estCompletion }
}

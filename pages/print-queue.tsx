"use client";
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getQueueInfo } from '../utils/printerQueue'
import { useRouter } from 'next/router';

interface PrintJob {
  id: string;
  job_name: string;
  filament_type: string;
  estimated_dur: number;
  queued_at: string;
  started_at?: string;
  finished_at?: string;
  status: string;
}

export default function PrintQueue() {
  const router = useRouter();
  const [jobName, setJobName] = useState('');
  const [filament, setFilament] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!jobName || !filament || !duration) {
      setMessage('All fields required.');
      return;
    }
    const { data, error } = await supabase
      .from('printer_queue')
      .insert([
        {
          job_name: jobName,
          filament_type: filament,
          estimated_dur: parseInt(duration, 10),
          status: 'queued',
        },
      ]);
    if (error) {
      setMessage('Error: ' + error.message);
      return;
    }
    const job = data[0] as any;
    const { position, estCompletion } = await getQueueInfo(job.id);
    setMessage(`Submitted! Position ${position}. Estimated completion at ${estCompletion.toLocaleTimeString()}`);
    setJobName('');
    setFilament('');
    setDuration('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-6">Submit 3D Print Job</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block mb-1">Job Name</label>
          <input
            type="text"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-800 border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1">Filament Type</label>
          <input
            type="text"
            value={filament}
            onChange={(e) => setFilament(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-800 border-gray-700"
            placeholder="e.g., PLA-White"
          />
        </div>
        <div>
          <label className="block mb-1">Estimated Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-800 border-gray-700"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Submit Job
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}

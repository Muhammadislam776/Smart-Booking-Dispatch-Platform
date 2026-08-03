'use client';

import React, { useEffect, useState } from 'react';
import { Engineer, Booking } from '@/types';
import { Navigation, MapPin, Wrench, ShieldCheck, Clock, User, Phone } from 'lucide-react';

interface LiveTrackingMapProps {
  booking?: Booking;
  engineers?: Engineer[];
  selectedEngineerId?: string;
  onSelectEngineer?: (engineerId: string) => void;
  height?: string;
}

export default function LiveTrackingMap({
  booking,
  engineers = [],
  selectedEngineerId,
  onSelectEngineer,
  height = 'h-[450px]',
}: LiveTrackingMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Default focus: London Coordinates
  const defaultLat = booking ? booking.lat : 51.5074;
  const defaultLng = booking ? booking.lng : -0.1278;

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group`}>
      {/* Background Interactive Map Simulation Grid */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-85 transition-all duration-700 filter contrast-[1.05]"
        style={{
          backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#0284c7 1px, #0f172a 1px)`,
          backgroundSize: '32px 32px, 128px 128px',
        }}
      >
        {/* Animated Road Lines Simulation */}
        <svg className="absolute inset-0 w-full h-full stroke-sky-500/30 fill-none" strokeWidth="3">
          <path d="M 50 150 Q 200 80 400 220 T 700 180" strokeDasharray="8 6" className="animate-[dash_20s_linear_infinite]" />
          <path d="M 100 350 Q 300 280 550 400 T 850 300" strokeDasharray="12 6" strokeWidth="4" className="stroke-indigo-500/40" />
        </svg>
      </div>

      {/* Map Controls Top Bar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-sky-400 flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Live GPS Satellite Tracking (UK)</span>
        </div>
      </div>

      {/* Customer Property Marker Pin */}
      {booking && (
        <div
          className="absolute z-20 transition-all duration-500 flex flex-col items-center cursor-pointer"
          style={{ top: '45%', left: '70%', transform: 'translate(-50%, -100%)' }}
        >
          <div className="bg-purple-600 text-white p-2 rounded-full shadow-xl ring-4 ring-purple-400/40 animate-bounce">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-700 shadow-md mt-1 whitespace-nowrap">
            {booking.customerName} ({booking.postcode})
          </div>
        </div>
      )}

      {/* Assigned or General Engineers Markers */}
      {engineers.map((eng, idx) => {
        const isAssigned = booking?.assignedEngineerId === eng.id;
        const isSelected = selectedEngineerId === eng.id;
        // Position simulation on map grid
        const topPos = isAssigned ? '50%' : `${30 + idx * 18}%`;
        const leftPos = isAssigned ? '35%' : `${25 + idx * 22}%`;

        return (
          <div
            key={eng.id}
            onClick={() => onSelectEngineer && onSelectEngineer(eng.id)}
            className={`absolute z-30 transition-all duration-700 flex flex-col items-center cursor-pointer ${
              isSelected ? 'scale-125 z-40' : 'hover:scale-110'
            }`}
            style={{ top: topPos, left: leftPos, transform: 'translate(-50%, -50%)' }}
          >
            {/* Engineer Vehicle Marker */}
            <div
              className={`p-2.5 rounded-full shadow-2xl transition-all border-2 ${
                isAssigned
                  ? 'bg-sky-500 text-white border-white ring-4 ring-sky-400/50 animate-pulse'
                  : 'bg-slate-800 text-slate-200 border-slate-600'
              }`}
            >
              <Navigation className={`w-5 h-5 ${isAssigned ? 'rotate-45' : ''}`} />
            </div>

            {/* Engineer Info Label */}
            <div className="bg-slate-900/95 text-white p-2 rounded-xl border border-slate-700 shadow-xl mt-1.5 flex items-center gap-2">
              <img
                src={eng.avatar}
                alt={eng.name}
                className="w-7 h-7 rounded-full object-cover border border-sky-400"
              />
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-100">{eng.name}</div>
                <div className="text-[10px] text-sky-400 font-semibold flex items-center gap-1">
                  <span>★ {eng.rating}</span> &bull; <span>{eng.vehicleRegistration.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Active Route Line & ETA overlay box when tracking an en-route job */}
      {booking && booking.assignedEngineerName && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-30 bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-2xl text-white max-w-sm animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-extrabold text-lg">
                {booking.etaMins || 12}
                <span className="text-[10px] font-normal block text-slate-400">MINS</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Engineer En Route
                </span>
                <h4 className="text-sm font-extrabold text-slate-100">{booking.assignedEngineerName}</h4>
                <p className="text-xs text-slate-400">{booking.assignedEngineerVehicle}</p>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-sky-400" /> {booking.assignedEngineerPhone}
            </span>
            <span className="font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
              Job #{booking.bookingRef}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

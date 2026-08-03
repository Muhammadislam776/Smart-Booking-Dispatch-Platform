'use client';

import React, { useState } from 'react';
import { Booking, ChatMessage, UserRole } from '@/types';
import { Send, MessageSquare, Check, User, Wrench } from 'lucide-react';

interface RealtimeChatProps {
  booking: Booking;
  currentUserId: string;
  currentUserName: string;
  currentUserRole: UserRole;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
}

export default function RealtimeChat({
  booking,
  currentUserId,
  currentUserName,
  currentUserRole,
  messages,
  onSendMessage,
}: RealtimeChatProps) {
  const [inputContent, setInputContent] = useState('');

  const bookingMessages = messages.filter((m) => m.bookingId === booking.id);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputContent.trim()) {
      onSendMessage(inputContent.trim());
      setInputContent('');
    }
  };

  const quickReplies = [
    'ETA is approximately 12 minutes.',
    'I have arrived at the property address.',
    'Gate access code received, thank you!',
    'Work completed and tested operational.',
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[480px]">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white">Live Job Chat #{booking.bookingRef}</h3>
            <p className="text-xs text-sky-400">
              Customer: {booking.customerName} &bull; Engineer: {booking.assignedEngineerName || 'Unassigned'}
            </p>
          </div>
        </div>
        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Real-time
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
        {bookingMessages.map((msg) => {
          const isMe = msg.senderId === currentUserId || msg.senderRole === currentUserRole;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-slate-500">
                <span>{msg.senderName}</span>
                <span>&bull;</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-xs shadow-sm ${
                  isMe
                    ? 'bg-sky-600 text-white rounded-tr-none font-medium'
                    : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none font-medium'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Responses */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <span className="text-slate-400 font-bold whitespace-nowrap">Quick:</span>
        {quickReplies.map((reply, i) => (
          <button
            key={i}
            onClick={() => onSendMessage(reply)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg whitespace-nowrap transition-all"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder="Type message to engineer/customer..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="submit"
          className="p-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-md transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

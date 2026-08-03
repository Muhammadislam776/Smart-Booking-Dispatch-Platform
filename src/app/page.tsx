'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { UserRole, Booking, JobStatus, Invoice, ChatMessage, NotificationItem, Business, User } from '@/types';
import {
  mockBusiness,
  mockEngineers,
  mockCustomers,
  mockServices,
  mockBookings,
  mockInvoices,
  mockChatMessages,
  mockNotifications,
} from '@/lib/mockData';

import EnterpriseLayout from '@/components/layout/EnterpriseLayout';
import RoleSwitcher from '@/components/layout/RoleSwitcher';
import BusinessOwnerDashboard from '@/components/dashboard/BusinessOwnerDashboard';
import DispatcherDashboard from '@/components/dashboard/DispatcherDashboard';
import EngineerDashboard from '@/components/dashboard/EngineerDashboard';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';
import SuperAdminPortal from '@/components/dashboard/SuperAdminPortal';
import SuperAdminMerchantsPage from '@/components/dashboard/SuperAdminMerchantsPage';
import GoogleBusinessWidget from '@/components/google/GoogleBusinessWidget';
import CustomerBookingWizard from '@/components/booking/CustomerBookingWizard';
import WhiteLabelModal from '@/components/whitelabel/WhiteLabelModal';
import AuthModal from '@/components/auth/AuthModal';
import AuthPage from '@/components/auth/AuthPage';

// Enterprise Dedicated Pages
import EnterpriseJobsPage from '@/components/enterprise/EnterpriseJobsPage';
import EnterpriseEngineersPage from '@/components/enterprise/EnterpriseEngineersPage';
import EnterpriseInvoicesPage from '@/components/enterprise/EnterpriseInvoicesPage';
import EnterpriseCustomersPage from '@/components/enterprise/EnterpriseCustomersPage';
import EnterpriseReportsPage from '@/components/enterprise/EnterpriseReportsPage';
import EnterpriseSettingsPage from '@/components/enterprise/EnterpriseSettingsPage';
import EnterpriseSupportPage from '@/components/enterprise/EnterpriseSupportPage';

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [currentRole, setCurrentRole] = useState<UserRole | 'google_widget'>('business_owner');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [business, setBusiness] = useState<Business>(mockBusiness);
  const [engineers, setEngineers] = useState<any[]>(mockEngineers);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [prefilledPostcode, setPrefilledPostcode] = useState('W8 4PT');
  const [showWhiteLabelModal, setShowWhiteLabelModal] = useState(false);

  const currentCustomer = mockCustomers[0];
  const currentEngineer = engineers[0] || mockEngineers[0];

  // FETCH ALL REAL DATA FROM MONGODB ATLAS ON LOAD
  useEffect(() => {
    const fetchAllMongoDBRecords = async () => {
      try {
        const [bRes, iRes, eRes] = await Promise.all([
          fetch('/api/bookings'),
          fetch('/api/invoices'),
          fetch('/api/engineers'),
        ]);

        const [bData, iData, eData] = await Promise.all([
          bRes.json(),
          iRes.json(),
          eRes.json(),
        ]);

        if (bData.success && bData.bookings?.length > 0) setBookings(bData.bookings);
        if (iData.success && iData.invoices?.length > 0) setInvoices(iData.invoices);
        if (eData.success && eData.engineers?.length > 0) setEngineers(eData.engineers);
      } catch (e) {
        console.log('MongoDB Atlas initial load fallback to state');
      }
    };

    fetchAllMongoDBRecords();
  }, []);

  const handleToggleTheme = () => setIsDark(!isDark);

  const handleLoginSuccess = (user: Partial<User>) => {
    setCurrentUser(user);
    setIsDemoMode(false);
    if (user.role) {
      setCurrentRole(user.role);
      setActiveTab('dashboard');
    }
  };

  const handleExploreDemo = () => {
    setIsDemoMode(true);
    setCurrentUser({
      id: 'demo_user',
      name: 'Sana Khan (Demo)',
      email: 'sanajavaidkhan44@weic.co.uk',
      role: 'business_owner',
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsDemoMode(false);
  };

  const handleRoleChange = (role: UserRole | 'google_widget') => {
    setCurrentRole(role);
    if (role === 'google_widget') {
      setActiveTab('google_widget');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleStartGoogleBooking = (postcode: string) => {
    setPrefilledPostcode(postcode);
    setCurrentRole('customer');
    setActiveTab('new_booking');
  };

  const handleCompleteBooking = async (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
    setActiveTab('dashboard');

    // Save Booking & Notification to MongoDB Atlas
    try {
      await Promise.all([
        fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBooking),
        }),
        fetch('/api/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `New Service Booking #${newBooking.bookingRef}`,
            message: `${newBooking.customerName} booked ${newBooking.serviceTitle} at ${newBooking.postcode}. Total £${newBooking.pricing?.total || 150}.`,
            type: 'booking',
            roleTarget: 'all',
          }),
        }),
      ]);
    } catch (e) {
      console.error('MongoDB Atlas save failed:', e);
    }
  };

  const handleAssignEngineer = async (bookingId: string, engineerId: string) => {
    const engineer = engineers.find((e) => e.id === engineerId);
    if (!engineer) return;

    setBookings(
      bookings.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            assignedEngineerId: engineer.id,
            assignedEngineerName: engineer.name,
            assignedEngineerPhone: engineer.phone,
            assignedEngineerAvatar: engineer.avatar,
            assignedEngineerVehicle: engineer.vehicleRegistration,
            status: 'assigned',
            etaMins: 18,
          };
        }
        return b;
      })
    );

    // Save Update to MongoDB Atlas
    try {
      await Promise.all([
        fetch('/api/bookings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: bookingId,
            status: 'assigned',
            assignedEngineerId: engineer.id,
            assignedEngineerName: engineer.name,
          }),
        }),
        fetch('/api/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `Engineer Dispatched`,
            message: `${engineer.name} has been dispatched to job #${bookingId}.`,
            type: 'dispatch',
            roleTarget: 'all',
          }),
        }),
      ]);
    } catch (e) {
      console.error('MongoDB Atlas save failed:', e);
    }
  };

  const handleUpdateJobStatus = async (bookingId: string, status: JobStatus, extraData?: any) => {
    setBookings(
      bookings.map((b) => {
        if (b.id === bookingId) {
          return { ...b, status, ...extraData };
        }
        return b;
      })
    );

    // Save Status Update to MongoDB Atlas
    try {
      await Promise.all([
        fetch('/api/bookings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: bookingId, status, extraData }),
        }),
        fetch('/api/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `Job Status Update`,
            message: `Job #${bookingId} status changed to ${status.replace('_', ' ')}.`,
            type: status === 'completed' ? 'system' : 'dispatch',
            roleTarget: 'all',
          }),
        }),
      ]);
    } catch (e) {
      console.error('MongoDB Atlas save failed:', e);
    }
  };

  const handleSendMessage = async (content: string) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      bookingId: bookings[0].id,
      senderId: currentRole === 'customer' ? currentCustomer.id : currentEngineer.id,
      senderName: currentRole === 'customer' ? currentCustomer.name : currentEngineer.name,
      senderRole: currentRole === 'customer' ? 'customer' : 'engineer',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    setChatMessages([...chatMessages, newMsg]);

    // Save Chat Record to MongoDB Atlas collection 'messages'
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: bookings[0].id,
          senderId: newMsg.senderId,
          senderName: newMsg.senderName,
          senderRole: newMsg.senderRole,
          content,
        }),
      });
    } catch (e) {
      console.error('Message save failed:', e);
    }
  };

  const handlePayInvoice = async (invoiceId: string) => {
    setInvoices(
      invoices.map((i) =>
        i.id === invoiceId
          ? { ...i, status: 'paid', paidAt: new Date().toISOString(), stripePaymentId: `ch_3N8zX_${Date.now()}` }
          : i
      )
    );

    // Save Payment to MongoDB Atlas
    try {
      await fetch('/api/invoices', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: invoiceId, status: 'paid' }),
      });
    } catch (e) {
      console.error('Invoice pay failed:', e);
    }
  };

  if (!currentUser && !isDemoMode) {
    return (
      <AuthPage
        onLoginSuccess={handleLoginSuccess}
        onExploreDemo={handleExploreDemo}
        isDark={isDark}
      />
    );
  }

  return (
    <EnterpriseLayout
      currentRole={currentRole}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab)}
      currentUser={currentUser}
      onLogout={handleLogout}
      onNewJobClick={() => setActiveTab('new_booking')}
      isDark={isDark}
      onToggleTheme={handleToggleTheme}
    >
      {isDemoMode && (
        <RoleSwitcher
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
        />
      )}

      <div>
        {activeTab === 'merchants' && currentRole === 'super_admin' ? (
          <SuperAdminMerchantsPage businesses={[business]} isDark={isDark} />
        ) : activeTab === 'jobs' ? (
          <EnterpriseJobsPage
            bookings={bookings}
            onNewJobClick={() => setActiveTab('new_booking')}
            onTabChange={(t) => setActiveTab(t)}
          />
        ) : activeTab === 'engineers' ? (
          <EnterpriseEngineersPage
            engineers={engineers}
            onTabChange={(t) => setActiveTab(t)}
          />
        ) : activeTab === 'invoices' ? (
          <EnterpriseInvoicesPage invoices={invoices} />
        ) : activeTab === 'customers' ? (
          <EnterpriseCustomersPage
            customers={mockCustomers}
            onTabChange={(t) => setActiveTab(t)}
          />
        ) : activeTab === 'reports' ? (
          <EnterpriseReportsPage onTabChange={(t) => setActiveTab(t)} />
        ) : activeTab === 'settings' ? (
          <EnterpriseSettingsPage
            onTabChange={(t) => setActiveTab(t)}
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
          />
        ) : activeTab === 'support' ? (
          <EnterpriseSupportPage onTabChange={(t) => setActiveTab(t)} />
        ) : currentRole === 'google_widget' || activeTab === 'google_widget' ? (
          <GoogleBusinessWidget
            business={business}
            onStartBooking={handleStartGoogleBooking}
            isDark={isDark}
          />
        ) : activeTab === 'new_booking' ? (
          <CustomerBookingWizard
            business={business}
            services={mockServices}
            initialPostcode={prefilledPostcode}
            onCompleteBooking={handleCompleteBooking}
            isDark={isDark}
          />
        ) : currentRole === 'super_admin' ? (
          <SuperAdminPortal businesses={[business]} isDark={isDark} />
        ) : currentRole === 'business_owner' ? (
          activeTab === 'dispatch' ? (
            <DispatcherDashboard
              business={business}
              bookings={bookings}
              engineers={engineers}
              services={mockServices}
              onAssignEngineer={handleAssignEngineer}
              isDark={isDark}
            />
          ) : (
            <BusinessOwnerDashboard
              business={business}
              bookings={bookings}
              invoices={invoices}
              engineers={engineers}
              services={mockServices}
              onOpenWhiteLabel={() => setShowWhiteLabelModal(true)}
              isDark={isDark}
            />
          )
        ) : currentRole === 'dispatcher' ? (
          <DispatcherDashboard
            business={business}
            bookings={bookings}
            engineers={engineers}
            services={mockServices}
            onAssignEngineer={handleAssignEngineer}
            isDark={isDark}
          />
        ) : currentRole === 'engineer' ? (
          <EngineerDashboard
            engineer={currentEngineer}
            bookings={bookings}
            onUpdateJobStatus={handleUpdateJobStatus}
            isDark={isDark}
          />
        ) : (
          <CustomerDashboard
            customer={currentCustomer}
            business={business}
            bookings={bookings}
            invoices={invoices}
            chatMessages={chatMessages}
            onSendMessage={handleSendMessage}
            onPayInvoice={handlePayInvoice}
            onNewBookingClick={() => setActiveTab('new_booking')}
            isDark={isDark}
          />
        )}
      </div>

      {showWhiteLabelModal && (
        <WhiteLabelModal
          business={business}
          onClose={() => setShowWhiteLabelModal(false)}
          onSaveBranding={(updated) => setBusiness({ ...business, ...updated })}
        />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
        isDark={isDark}
      />
    </EnterpriseLayout>
  );
}

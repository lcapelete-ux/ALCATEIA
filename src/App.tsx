/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MilkHighlightBanner } from './components/MilkHighlightBanner';
import { EventDetails } from './components/EventDetails';
import { RegistrationSection } from './components/RegistrationSection';
import { AdminArea } from './components/AdminArea';
import { WolfIntro } from './components/WolfIntro';
import { RedWolfBackground } from './components/RedWolfBackground';
import { Footer } from './components/Footer';
import { StorageService } from './services/storage';
import { FirebaseService } from './services/firebase';
import { Participant, EventStats } from './types';

export default function App() {
  // Always show intro at the top - removed conditional logic
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [stats, setStats] = useState<EventStats>({
    total: 0,
    maleCount: 0,
    femaleCount: 0,
    kitsAllocated: 0,
    maxKits: 150,
    kitsRemaining: 150,
    totalRevenue: 0,
    milkPledgedLitres: 0,
    milkDeliveredLitres: 0,
    checkedInCount: 0,
  });

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Load participants and stats from persistent storage
  const refreshData = useCallback(() => {
    const list = StorageService.getParticipants();
    const currentStats = StorageService.getStats();
    setParticipants(list);
    setStats(currentStats);
  }, []);

  useEffect(() => {
    // Initial local load for instantaneous UI rendering
    refreshData();

    // Subscribe to live Firestore cloud database changes
    const unsubscribe = FirebaseService.subscribeParticipants((remoteParticipants) => {
      if (remoteParticipants && remoteParticipants.length > 0) {
        StorageService.syncFromFirebase(remoteParticipants);
        refreshData();
      } else {
        // If Firestore collection is empty, seed it with the initial participants
        const localList = StorageService.getParticipants();
        if (localList.length > 0) {
          FirebaseService.seedInitialData(localList).catch(console.error);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [refreshData]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleRegistrationSuccess = (newAthlete: Participant) => {
    refreshData();
  };

  return (
    <div className="min-h-screen bg-[#070709] text-slate-100 flex flex-col selection:bg-[#E51E2B] selection:text-white font-sans relative overflow-x-hidden">
      {/* Background Red Wolf with balanced opacity */}
      <RedWolfBackground opacity={0.35} />

      {/* Dynamic Wolf Running Intro Animation */}
      <AnimatePresence>
        {showIntro && <WolfIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main App Navigation */}
      <div className="relative z-10">
        <Navbar
          onOpenAdmin={() => setIsAdminOpen(true)}
          registeredCount={stats.total}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-6">
        {/* Hero Section */}
        <Hero
          kitsRemaining={stats.kitsRemaining}
          totalRegistered={stats.total}
        />

        {/* 1 LITRO DE LEITE EM ALTA EVIDÊNCIA */}
        <div className="scroll-mt-24" id="doacao-leite">
          <MilkHighlightBanner pledgedCount={stats.milkPledgedLitres} />
        </div>

        {/* Event Details, Schedule, Location and Prizes */}
        <EventDetails />

        {/* Official Registration Form & Simulator */}
        <RegistrationSection
          onRegistrationSuccess={handleRegistrationSuccess}
          kitsRemaining={stats.kitsRemaining}
          totalRegistered={stats.total}
        />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </div>

      {/* Admin Area Modal (Protected) */}
      {isAdminOpen && (
        <AdminArea
          participants={participants}
          stats={stats}
          onDataChanged={refreshData}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}

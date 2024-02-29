'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Avatar from './section/avatar';
import Chatbot from './section/chatbot';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('stories');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Head>
        <title>Profile Page</title>
      </Head>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          {/* First Section */}
          <div className="flex items-center">
            <div className="mr-4">
              {/* Replace these props with actual avatar and username/wallet address */}
              <Avatar imageUrl="/avatar.png" username="Username" />
            </div>
            {/* Replace tokenEarnings with actual token earnings */}
            <div>
              <p className="text-lg font-bold">Token Earnings: 100</p>
            </div>
          </div>
          {/* Second Section */}
          <div>
            <Chatbot />
          </div>
        </div>
        {/* Second Section with Tabs */}
        <div className="mt-8">
          <div className="flex justify-between border-b pb-2 mb-4">
            <button
              className={`tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
              onClick={() => handleTabChange('stories')}
            >
              Stories
            </button>
            <button
              className={`tab-btn ${activeTab === 'targets' ? 'active' : ''}`}
              onClick={() => handleTabChange('targets')}
            >
              Targets
            </button>
            <button
              className={`tab-btn ${activeTab === 'challenge' ? 'active' : ''}`}
              onClick={() => handleTabChange('challenge')}
            >
              Challenge
            </button>
          </div>
          {/* Content based on active tab */}
          {activeTab === 'stories' && <div>Stories Content</div>}
          {activeTab === 'targets' && <div>Targets Content</div>}
          {activeTab === 'challenge' && <div>Challenge Content</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

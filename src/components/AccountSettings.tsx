import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  ChevronRight, 
  Mail,
  Smartphone,
  Globe,
  Clock,
  DollarSign,
  AlertCircle
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  timezone: string;
  currency: string;
  notifications: {
    trade: boolean;
    news: boolean;
    price: boolean;
  };
  twoFactorEnabled: boolean;
}

function AccountSettings() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const defaultProfile = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      timezone: 'America/New_York',
      currency: 'USD',
      notifications: {
        trade: true,
        news: false,
        price: true,
      },
      twoFactorEnabled: false
    };

    if (!savedProfile) return defaultProfile;

    // Merge saved profile with default values to ensure all fields exist
    const parsedProfile = JSON.parse(savedProfile);
    return {
      ...defaultProfile,
      ...parsedProfile,
      notifications: {
        ...defaultProfile.notifications,
        ...(parsedProfile.notifications || {})
      }
    };
  });

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    localStorage.setItem('userProfile', JSON.stringify(editedProfile));
    setIsEditing(false);
  };

  const handleNotificationToggle = (key: keyof typeof profile.notifications) => {
    const updatedProfile = {
      ...profile,
      notifications: {
        ...profile.notifications,
        [key]: !profile.notifications[key]
      }
    };
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  const sections = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: User,
      content: [
        { label: 'Name', value: profile.name, key: 'name' },
        { label: 'Email', value: profile.email, key: 'email' },
        { label: 'Phone', value: profile.phone, key: 'phone' },
      ]
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: Globe,
      content: [
        { label: 'Time Zone', value: profile.timezone, key: 'timezone' },
        { label: 'Currency', value: profile.currency, key: 'currency' },
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Change Password', icon: Lock },
        { label: 'Two-Factor Authentication', icon: Smartphone, toggle: true, value: profile.twoFactorEnabled },
        { label: 'Active Sessions', icon: Clock },
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      notifications: [
        { key: 'trade', label: 'Trade Confirmations', value: profile.notifications.trade },
        { key: 'news', label: 'Market News', value: profile.notifications.news },
        { key: 'price', label: 'Price Alerts', value: profile.notifications.price },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {sections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div key={section.id} className="p-6">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                >
                  <div className="flex items-center space-x-3">
                    <SectionIcon className="h-5 w-5 text-gray-400" />
                    <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
                  </div>
                  <ChevronRight 
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      activeSection === section.id ? 'transform rotate-90' : ''
                    }`}
                  />
                </div>

                {activeSection === section.id && (
                  <div className="mt-4 space-y-4">
                    {section.content ? (
                      <div className="grid grid-cols-1 gap-4">
                        {section.content.map((item) => (
                          <div key={item.key} className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{item.label}</span>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editedProfile[item.key as keyof UserProfile] as string}
                                onChange={(e) => setEditedProfile({
                                  ...editedProfile,
                                  [item.key]: e.target.value
                                })}
                                className="text-sm border rounded px-2 py-1"
                              />
                            ) : (
                              <span className="text-sm font-medium">{item.value}</span>
                            )}
                          </div>
                        ))}
                        <div className="flex justify-end space-x-2 mt-4">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => {
                                  setEditedProfile(profile);
                                  setIsEditing(false);
                                }}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleSave}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Save Changes
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setIsEditing(true)}
                              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    ) : section.notifications ? (
                      <div className="space-y-3">
                        {section.notifications.map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                          >
                            <span className="text-sm font-medium text-gray-700">
                              {item.label}
                            </span>
                            <button
                              onClick={() => handleNotificationToggle(item.key as keyof typeof profile.notifications)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                item.value ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  item.value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : section.items && (
                      <div className="space-y-3">
                        {section.items.map((item, index) => {
                          const ItemIcon = item.icon;
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                            >
                              <div className="flex items-center space-x-3">
                                {ItemIcon && <ItemIcon className="h-5 w-5 text-gray-400" />}
                                <span className="text-sm font-medium text-gray-700">
                                  {item.label}
                                </span>
                              </div>
                              {item.toggle !== undefined ? (
                                <button
                                  onClick={() => {
                                    if (item.label === 'Two-Factor Authentication') {
                                      const updatedProfile = {
                                        ...profile,
                                        twoFactorEnabled: !profile.twoFactorEnabled
                                      };
                                      setProfile(updatedProfile);
                                      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                                    }
                                  }}
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    profile.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      profile.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  />
                                </button>
                              ) : (
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
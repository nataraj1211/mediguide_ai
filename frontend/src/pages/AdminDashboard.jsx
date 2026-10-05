import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  Camera, 
  AlertOctagon, 
  Building2, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Loader2, 
  Star,
  ExternalLink,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const AdminDashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('facilities'); // 'facilities', 'feedback'

  // Modal / Form state for Add Facility
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFacility, setNewFacility] = useState({
    name: '',
    facility_type: 'Hospital',
    specialty: 'General Medicine',
    address: '',
    city: 'Dindigul',
    latitude: 10.3673,
    longitude: 77.9803,
    phone: '',
    website: '',
    verified: false,
    source: ''
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const statsRes = await api.getAdminStats();
      setStats(statsRes.stats);
      setFeedbackList(statsRes.recentFeedbacks || []);
      const facs = await api.getNearbyHealthcare({ limit: 100 });
      setFacilities(facs);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleVerify = async (id) => {
    try {
      const updated = await api.toggleVerifyFacility(id);
      setFacilities(prev => prev.map(f => (f.id === id ? updated : f)));
      // Refresh stats
      const statsRes = await api.getAdminStats();
      setStats(statsRes.stats);
    } catch (err) {
      alert('Verification update error: ' + err.message);
    }
  };

  const handleDeleteFacility = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this facility?')) return;
    try {
      await api.deleteFacility(id);
      setFacilities(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      alert('Failed to delete facility: ' + err.message);
    }
  };

  const handleCreateFacility = async (e) => {
    e.preventDefault();
    if (!newFacility.name || !newFacility.address || !newFacility.city) {
      alert('Please fill all mandatory fields.');
      return;
    }

    try {
      const created = await api.createFacility(newFacility);
      setFacilities(prev => [created, ...prev]);
      setShowAddModal(false);
      setNewFacility({
        name: '',
        facility_type: 'Hospital',
        specialty: 'General Medicine',
        address: '',
        city: 'Dindigul',
        latitude: 10.3673,
        longitude: 77.9803,
        phone: '',
        website: '',
        verified: false,
        source: ''
      });
      alert('Healthcare facility record created successfully!');
    } catch (err) {
      alert('Failed to add facility: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management Console</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              MediGuide AI Administration
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Logged in as: {user?.fullName || user?.email} (Role: Administrator)
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Healthcare Facility</span>
          </button>
        </div>

        {/* Overview Metric Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-2">
                <Users className="w-4 h-4 text-sky-500" />
                <span>Total Users</span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalUsers}</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-2">
                <Activity className="w-4 h-4 text-teal-500" />
                <span>Symptom Checks</span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalChecks}</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-2">
                <Camera className="w-4 h-4 text-indigo-500" />
                <span>Image Analyses</span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.imageAnalyses}</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-2">
                <AlertOctagon className="w-4 h-4 text-red-500" />
                <span>Emergencies</span>
              </div>
              <div className="text-2xl font-black text-red-600">{stats.emergencyAlerts}</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-2">
                <Building2 className="w-4 h-4 text-emerald-500" />
                <span>Facilities</span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalFacilities}</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-2">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <span>Feedbacks</span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalFeedbacks}</div>
            </div>

          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('facilities')}
            className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 -mb-px ${
              activeTab === 'facilities'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Manage Facilities ({facilities.length})
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 -mb-px ${
              activeTab === 'feedback'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            User Feedbacks ({feedbackList.length})
          </button>
        </div>

        {/* Tab 1: Manage Healthcare Facilities */}
        {activeTab === 'facilities' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Facility Name</th>
                    <th className="py-3 px-4">City / Type</th>
                    <th className="py-3 px-4">Specialty</th>
                    <th className="py-3 px-4">Verification Status</th>
                    <th className="py-3 px-4">Source Attribute</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {facilities.map((fac) => (
                    <tr key={fac.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                        {fac.name}
                        <div className="text-[10px] text-slate-400 font-normal">{fac.phone || 'No phone'}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 dark:text-slate-200">{fac.city}</span>
                        <div className="text-[10px] text-slate-400">{fac.facility_type}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-medium">
                          {fac.specialty}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {fac.verified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md">
                            Demo Data
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-[11px] max-w-xs truncate" title={fac.source}>
                        {fac.source}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <button
                          onClick={() => handleToggleVerify(fac.id)}
                          className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-medium text-[11px]"
                          title="Toggle Verification status"
                        >
                          {fac.verified ? 'Unverify' : 'Mark Verified'}
                        </button>
                        <button
                          onClick={() => handleDeleteFacility(fac.id)}
                          className="p-1 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                          title="Delete Facility"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: User Feedbacks */}
        {activeTab === 'feedback' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Patient & User Feedback Logs
            </h3>
            {feedbackList.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No user feedback submitted yet.</p>
            ) : (
              <div className="space-y-3">
                {feedbackList.map((fb) => (
                  <div key={fb.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800 dark:text-white">{fb.name} ({fb.email})</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <span>{fb.rating}</span>
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">{fb.comment}</p>
                    <span className="text-[10px] text-slate-400 mt-2 block">
                      Submitted on: {new Date(fb.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Facility Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Add Healthcare Facility Record
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateFacility} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Facility Name *</label>
                  <input
                    type="text"
                    value={newFacility.name}
                    onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
                    required
                    placeholder="e.g. Dindigul Central Hospital"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Facility Type *</label>
                    <select
                      value={newFacility.facility_type}
                      onChange={(e) => setNewFacility({ ...newFacility, facility_type: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                      <option value="Hospital">Hospital</option>
                      <option value="Clinic">Clinic</option>
                      <option value="Emergency">Emergency Center</option>
                      <option value="Pharmacy">Pharmacy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">City *</label>
                    <input
                      type="text"
                      value={newFacility.city}
                      onChange={(e) => setNewFacility({ ...newFacility, city: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Specialty</label>
                  <select
                    value={newFacility.specialty}
                    onChange={(e) => setNewFacility({ ...newFacility, specialty: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="General Medicine">General Medicine</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Dentistry">Dentistry</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Full Address *</label>
                  <input
                    type="text"
                    value={newFacility.address}
                    onChange={(e) => setNewFacility({ ...newFacility, address: e.target.value })}
                    required
                    placeholder="Road, Area, Pincode"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={newFacility.latitude}
                      onChange={(e) => setNewFacility({ ...newFacility, latitude: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={newFacility.longitude}
                      onChange={(e) => setNewFacility({ ...newFacility, longitude: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={newFacility.phone}
                      onChange={(e) => setNewFacility({ ...newFacility, phone: e.target.value })}
                      placeholder="e.g. 0451-2460020"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Website URL</label>
                    <input
                      type="url"
                      value={newFacility.website}
                      onChange={(e) => setNewFacility({ ...newFacility, website: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold">
                    <input
                      type="checkbox"
                      checked={newFacility.verified}
                      onChange={(e) => setNewFacility({ ...newFacility, verified: e.target.checked })}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span>Mark as Verified Official Registry Record</span>
                  </label>
                </div>

                {newFacility.verified && (
                  <div>
                    <label className="block font-semibold mb-1">Official Registry Source *</label>
                    <input
                      type="text"
                      value={newFacility.source}
                      onChange={(e) => setNewFacility({ ...newFacility, source: e.target.value })}
                      placeholder="e.g. Directorate of Medical Education (DME) Portal"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                )}

                <div className="pt-4 flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-md"
                  >
                    Save Facility
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;

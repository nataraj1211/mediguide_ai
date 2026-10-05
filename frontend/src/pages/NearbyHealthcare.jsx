import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Search, 
  Navigation, 
  Filter, 
  Loader2, 
  Crosshair, 
  AlertCircle, 
  CheckCircle,
  PhoneCall
} from 'lucide-react';
import MapView from '../components/MapView';
import FacilityCard from '../components/FacilityCard';
import { api } from '../services/api';

export const NearbyHealthcare = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCity = searchParams.get('city') || 'All';
  const initialSpecialty = searchParams.get('specialty') || 'All';

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedFacilityType, setSelectedFacilityType] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null); // 'prompt', 'locating', 'granted', 'denied'
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const cities = ['All', 'Dindigul', 'Madurai', 'Coimbatore', 'Chennai', 'Trichy'];
  const facilityTypes = ['All', 'Hospital', 'Clinic', 'Emergency', 'Pharmacy'];
  const specialties = ['All', 'General Medicine', 'Dermatology', 'Ophthalmology', 'Orthopedics', 'Dentistry', 'Emergency'];

  const fetchFacilities = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const params = {};
      if (selectedCity !== 'All') params.city = selectedCity;
      if (selectedFacilityType !== 'All') params.facilityType = selectedFacilityType;
      if (selectedSpecialty !== 'All') params.specialty = selectedSpecialty;
      if (searchQuery.trim()) params.q = searchQuery.trim();
      if (userLocation) {
        params.latitude = userLocation.latitude;
        params.longitude = userLocation.longitude;
      }

      const data = await api.getNearbyHealthcare(params);
      setFacilities(data);
    } catch (err) {
      setErrorMessage(err.message || 'Unable to retrieve healthcare facilities at this time.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, [selectedCity, selectedFacilityType, selectedSpecialty, userLocation]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFacilities();
  };

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      setErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    setLocationStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setUserLocation(coords);
        setLocationStatus('granted');
      },
      (error) => {
        console.warn('Geolocation permission error:', error.message);
        setLocationStatus('denied');
        setErrorMessage('Location permission was denied. You can select your city manually below.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <Building2 className="w-8 h-8 text-sky-600" />
              <span>Find Nearby Healthcare</span>
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Discover verified public medical college hospitals, district centers, and specialized clinics across Tamil Nadu.
            </p>
          </div>

          {/* Location Permission Button */}
          <div className="shrink-0">
            <button
              onClick={handleRequestLocation}
              disabled={locationStatus === 'locating'}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-sky-500 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Crosshair className={`w-4 h-4 text-sky-600 ${locationStatus === 'locating' ? 'animate-spin' : ''}`} />
              <span>
                {locationStatus === 'granted'
                  ? 'Current Location Active'
                  : locationStatus === 'locating'
                  ? 'Detecting Location...'
                  : 'Use Current Location'}
              </span>
            </button>
          </div>
        </div>

        {/* Feedback / Error banner if location denied */}
        {locationStatus === 'denied' && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Location access not granted. Please select your city or area manually from the filters below.</span>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by hospital name, specialty, address, or landmark..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          {/* Filter Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            
            {/* City Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                City / Region
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c === 'All' ? 'All Cities (Tamil Nadu)' : c}</option>
                ))}
              </select>
            </div>

            {/* Facility Type */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Facility Type
              </label>
              <select
                value={selectedFacilityType}
                onChange={(e) => setSelectedFacilityType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {facilityTypes.map((t) => (
                  <option key={t} value={t}>{t === 'All' ? 'All Facility Types' : t}</option>
                ))}
              </select>
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>{s === 'All' ? 'All Specialties' : s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Map and Facilities Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Interactive Map (7 cols on desktop) */}
          <div className="lg:col-span-7 sticky top-20">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold">Interactive Location Map</span>
              <span>Click any marker to view contact info & directions</span>
            </div>
            <MapView
              facilities={facilities}
              userLocation={userLocation}
              selectedFacility={selectedFacility}
              onSelectFacility={(fac) => setSelectedFacility(fac)}
            />
          </div>

          {/* Facilities List (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Found {facilities.length} healthcare facilities</span>
              {userLocation && <span className="text-sky-600 font-semibold">Sorted by distance</span>}
            </div>

            {loading ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
                <Loader2 className="w-8 h-8 text-sky-600 animate-spin mx-auto mb-3" />
                <p className="text-xs text-slate-500">Loading healthcare facilities...</p>
              </div>
            ) : facilities.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-800">
                <Building2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">No facilities match your filters</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Try clearing your search query or switching to "All Cities".
                </p>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[720px] overflow-y-auto pr-1">
                {facilities.map((fac) => (
                  <FacilityCard
                    key={fac.id}
                    facility={fac}
                    isSelected={selectedFacility?.id === fac.id}
                    onSelect={(f) => setSelectedFacility(f)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NearbyHealthcare;

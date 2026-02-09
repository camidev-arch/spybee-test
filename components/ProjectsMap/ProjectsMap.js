'use client';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './ProjectsMap.module.css';
import useProjectsStore from '@/store/useProjectsStore';

// Set your Mapbox access token here
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

export default function ProjectsMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [mapReady, setMapReady] = useState(false);

  const { filteredProjects, selectedProject, setSelectedProject, getItemCounts } = useProjectsStore();

  // Initialize map
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 2
    });

    map.current.on('load', () => {
      setMapReady(true);
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when projects change
  useEffect(() => {
    if (!mapReady || !map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    filteredProjects.forEach(project => {
      if (!project.position?.lat || !project.position?.lng) return;

      const counts = getItemCounts(project);
      const isSelected = selectedProject?._id === project._id;

      // Create marker element
      const el = document.createElement('div');
      el.className = `${styles.marker} ${isSelected ? styles.markerSelected : ''}`;
      
      // Create marker popup content
      const popupContent = `
        <div class="${styles.popup}">
          <h3>${project.title}</h3>
          <p class="${styles.popupCity}">${project.city || 'Sin ubicación'}</p>
          <div class="${styles.popupStats}">
            <div>
              <span class="${styles.statNumber}">${counts.incidents}</span>
              <span class="${styles.statLabel}">Incidencias</span>
            </div>
            <div>
              <span class="${styles.statNumber}">${counts.rfi}</span>
              <span class="${styles.statLabel}">RFI</span>
            </div>
            <div>
              <span class="${styles.statNumber}">${counts.tasks}</span>
              <span class="${styles.statLabel}">Tareas</span>
            </div>
          </div>
          <p class="${styles.popupPlan}">Plan: ${project.projectPlanData?.plan || 'N/A'}</p>
        </div>
      `;

      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: false
      }).setHTML(popupContent);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([project.position.lng, project.position.lat])
        .setPopup(popup)
        .addTo(map.current);

      // Handle marker click
      el.addEventListener('click', () => {
        setSelectedProject(project);
        marker.togglePopup();
      });

      markers.current.push(marker);
    });

    // Fit bounds to show all markers
    if (filteredProjects.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredProjects.forEach(project => {
        if (project.position?.lat && project.position?.lng) {
          bounds.extend([project.position.lng, project.position.lat]);
        }
      });
      
      if (!bounds.isEmpty()) {
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
      }
    }
  }, [mapReady, filteredProjects, selectedProject, getItemCounts, setSelectedProject]);

  // Fly to selected project
  useEffect(() => {
    if (!mapReady || !map.current || !selectedProject?.position) return;

    map.current.flyTo({
      center: [selectedProject.position.lng, selectedProject.position.lat],
      zoom: 12,
      duration: 1500
    });

    // Open popup for selected project
    const selectedMarker = markers.current.find(marker => {
      const lngLat = marker.getLngLat();
      return lngLat.lng === selectedProject.position.lng && 
             lngLat.lat === selectedProject.position.lat;
    });

    if (selectedMarker && !selectedMarker.getPopup().isOpen()) {
      selectedMarker.togglePopup();
    }
  }, [mapReady, selectedProject]);

  return (
    <div className={styles.mapWrapper}>
      <div ref={mapContainer} className={styles.mapContainer} />
      {!mapReady && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando mapa...</p>
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef } from 'react'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import key from './test.ts'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'

export default function ArcGISMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  console.log(key);
  useEffect(() => {
    if (!containerRef.current) return
    
    const symbol = {
      type: 'simple-marker' as const,
      color: 'red',
      size: 8,
    }
    const rend = {
      type: 'simple' as const,
      symbol: symbol
    }

    const layer = new FeatureLayer({
        url: 'https://services7.arcgis.com/DSSF7DFVxfZsz379/ArcGIS/rest/services/LARAP_Trails_Public/FeatureServer/0',
        renderer: rend
    })

    const map = new Map({
      basemap: 'streets-night-vector',
      layers: [layer]
    })

    const view = new MapView({
      container: containerRef.current,
      map,
      center: [-118.805, 34.027],
      zoom: 13,
    })

    return () => {
      view.destroy()
    }
  }, [])

  return <div ref={containerRef} className="mapView" />
}

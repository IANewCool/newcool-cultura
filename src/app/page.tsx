'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Centros culturales por region
const CENTROS = [
  { id: 1, nombre: 'Centro Cultural Arica', region: 'Arica y Parinacota', direccion: 'Vicuña Mackenna 652, Arica', tipo: 'Centro Cultural', horario: 'Martes a Domingo 10:00-18:00' },
  { id: 2, nombre: 'Teatro Municipal de Iquique', region: 'Tarapaca', direccion: 'Plaza Prat, Iquique', tipo: 'Teatro', horario: 'Segun programacion' },
  { id: 3, nombre: 'Ruinas de Huanchaca', region: 'Antofagasta', direccion: 'Av. Angamos 01606, Antofagasta', tipo: 'Centro Cultural', horario: 'Martes a Domingo 10:00-18:00' },
  { id: 4, nombre: 'Centro Cultural Atacama', region: 'Atacama', direccion: 'Atacama 98, Copiapo', tipo: 'Centro Cultural', horario: 'Lunes a Viernes 09:00-18:00' },
  { id: 5, nombre: 'Teatro Municipal La Serena', region: 'Coquimbo', direccion: 'Balmaceda esq. Cordovez, La Serena', tipo: 'Teatro', horario: 'Segun programacion' },
  { id: 6, nombre: 'Parque Cultural de Valparaiso', region: 'Valparaiso', direccion: 'Cerro Carcel, Valparaiso', tipo: 'Centro Cultural', horario: 'Martes a Domingo 10:00-19:00' },
  { id: 7, nombre: 'Centro Cultural GAM', region: 'Metropolitana', direccion: 'Av. Libertador Bernardo OHiggins 227, Santiago', tipo: 'Centro Cultural', horario: 'Martes a Domingo 10:00-21:00' },
  { id: 8, nombre: 'Centro Cultural Casa Colorada', region: 'Metropolitana', direccion: 'Merced 860, Santiago', tipo: 'Centro Cultural', horario: 'Martes a Viernes 10:00-18:00' },
  { id: 9, nombre: 'Teatro Regional del Maule', region: 'Maule', direccion: '1 Oriente 1456, Talca', tipo: 'Teatro', horario: 'Segun programacion' },
  { id: 10, nombre: 'Centro Cultural Biobio', region: 'Biobio', direccion: 'Av. Pedro Aguirre Cerda, Concepcion', tipo: 'Centro Cultural', horario: 'Martes a Domingo 10:00-18:00' },
  { id: 11, nombre: 'Teatro Municipal de Temuco', region: 'Araucania', direccion: 'Av. Alemania 945, Temuco', tipo: 'Teatro', horario: 'Segun programacion' },
  { id: 12, nombre: 'Centro Cultural de Valdivia', region: 'Los Rios', direccion: 'Yungay 733, Valdivia', tipo: 'Centro Cultural', horario: 'Martes a Viernes 10:00-18:00' },
  { id: 13, nombre: 'Teatro Diego Rivera', region: 'Los Lagos', direccion: 'Quillota 116, Puerto Montt', tipo: 'Teatro', horario: 'Segun programacion' },
  { id: 14, nombre: 'Centro Cultural de Coyhaique', region: 'Aysen', direccion: 'Moraleda 449, Coyhaique', tipo: 'Centro Cultural', horario: 'Lunes a Viernes 09:00-18:00' },
  { id: 15, nombre: 'Centro Cultural de Punta Arenas', region: 'Magallanes', direccion: 'Av. España 959, Punta Arenas', tipo: 'Centro Cultural', horario: 'Martes a Domingo 10:00-18:00' },
  { id: 16, nombre: 'Centro Cultural Nuble', region: 'Nuble', direccion: '5 de Abril 567, Chillan', tipo: 'Centro Cultural', horario: 'Lunes a Viernes 09:00-18:00' }
];

// Museos nacionales
const MUSEOS = [
  { nombre: 'Museo Nacional de Bellas Artes', ubicacion: 'Santiago', icono: '🎨', descripcion: 'Arte chileno e internacional desde la Colonia hasta hoy', entrada: 'Gratuita', web: 'mnba.gob.cl' },
  { nombre: 'Museo Nacional de Historia Natural', ubicacion: 'Santiago', icono: '🦕', descripcion: 'Ciencias naturales, paleontologia y biodiversidad chilena', entrada: 'Gratuita', web: 'mnhn.gob.cl' },
  { nombre: 'Museo Historico Nacional', ubicacion: 'Santiago', icono: '🏛️', descripcion: 'Historia de Chile desde pueblos originarios hasta hoy', entrada: 'Gratuita', web: 'mhn.gob.cl' },
  { nombre: 'Museo de Arte Precolombino', ubicacion: 'Santiago', icono: '🏺', descripcion: 'Arte y cultura de pueblos americanos antes de Colon', entrada: '$7.000', web: 'precolombino.cl' },
  { nombre: 'Museo de la Memoria', ubicacion: 'Santiago', icono: '🕯️', descripcion: 'Derechos humanos y memoria historica 1973-1990', entrada: 'Gratuita', web: 'museodelamemoria.cl' },
  { nombre: 'Museo Artequin', ubicacion: 'Santiago', icono: '🖼️', descripcion: 'Educacion artistica interactiva para niños y familias', entrada: '$1.500', web: 'artequin.cl' },
  { nombre: 'Museo Interactivo Mirador (MIM)', ubicacion: 'Santiago', icono: '🔬', descripcion: 'Ciencia y tecnologia interactiva para todas las edades', entrada: '$5.500', web: 'mim.cl' },
  { nombre: 'Museo Regional de Magallanes', ubicacion: 'Punta Arenas', icono: '🐧', descripcion: 'Historia y patrimonio de la Patagonia chilena', entrada: 'Gratuita', web: 'museomagallanes.cl' }
];

// Bibliotecas publicas principales
const BIBLIOTECAS = [
  { nombre: 'Biblioteca Nacional', ubicacion: 'Santiago', direccion: 'Av. Libertador Bernardo OHiggins 651', servicios: ['Prestamo', 'Sala de lectura', 'Archivo', 'Digitalizacion'], horario: 'Lunes a Viernes 09:00-19:00' },
  { nombre: 'Biblioteca de Santiago', ubicacion: 'Santiago', direccion: 'Matucana 151', servicios: ['Prestamo', 'Sala infantil', 'Multimedia', 'Talleres'], horario: 'Martes a Domingo 11:00-20:00' },
  { nombre: 'Biblioteca Viva', ubicacion: 'Varias sedes', direccion: 'Mall Plaza (varias ubicaciones)', servicios: ['Prestamo gratuito', 'Wifi', 'Computadores', 'Actividades'], horario: 'Segun mall' },
  { nombre: 'Biblioteca Regional de Antofagasta', ubicacion: 'Antofagasta', direccion: 'Washington 2623', servicios: ['Prestamo', 'Sala de lectura', 'Internet', 'Extension'], horario: 'Lunes a Viernes 09:00-18:00' },
  { nombre: 'Biblioteca Regional de Valparaiso', ubicacion: 'Valparaiso', direccion: 'Blanco 1117', servicios: ['Prestamo', 'Archivo regional', 'Hemeroteca', 'Actividades'], horario: 'Lunes a Viernes 09:00-18:00' },
  { nombre: 'Biblioteca Regional de Concepcion', ubicacion: 'Concepcion', direccion: 'Caupolican 567', servicios: ['Prestamo', 'Sala de lectura', 'Extension cultural', 'Talleres'], horario: 'Lunes a Viernes 09:00-18:00' }
];

// Fondos de cultura
const FONDOS = [
  { nombre: 'FONDART Nacional', icono: '🎭', descripcion: 'Financiamiento para proyectos artisticos y culturales', montos: '$5M - $80M', areas: ['Artes visuales', 'Teatro', 'Danza', 'Musica', 'Fotografia'], postulacion: 'Anual (marzo-abril)' },
  { nombre: 'FONDART Regional', icono: '🗺️', descripcion: 'Proyectos de impacto regional y local', montos: '$3M - $30M', areas: ['Creacion', 'Difusion', 'Formacion', 'Infraestructura'], postulacion: 'Anual (marzo-abril)' },
  { nombre: 'Fondo del Libro', icono: '📚', descripcion: 'Apoyo a la creacion literaria y fomento lector', montos: '$2M - $50M', areas: ['Creacion', 'Edicion', 'Difusion', 'Fomento lector'], postulacion: 'Anual (abril-mayo)' },
  { nombre: 'Fondo de la Musica', icono: '🎵', descripcion: 'Desarrollo de la industria musical chilena', montos: '$3M - $60M', areas: ['Creacion', 'Produccion', 'Difusion', 'Formacion'], postulacion: 'Anual (marzo-abril)' },
  { nombre: 'Fondo Audiovisual', icono: '🎬', descripcion: 'Cine, television y nuevos medios audiovisuales', montos: '$10M - $300M', areas: ['Desarrollo', 'Produccion', 'Distribucion', 'Formacion'], postulacion: 'Anual (abril-mayo)' },
  { nombre: 'Fondo del Patrimonio', icono: '🏛️', descripcion: 'Conservacion y difusion del patrimonio cultural', montos: '$5M - $100M', areas: ['Restauracion', 'Investigacion', 'Difusion', 'Infraestructura'], postulacion: 'Anual (marzo-abril)' }
];

// Patrimonio de la humanidad en Chile
const PATRIMONIO = [
  { nombre: 'Rapa Nui', tipo: 'Cultural', año: 1995, icono: '🗿', ubicacion: 'Isla de Pascua' },
  { nombre: 'Iglesias de Chiloe', tipo: 'Cultural', año: 2000, icono: '⛪', ubicacion: 'Chiloe' },
  { nombre: 'Barrio Historico Valparaiso', tipo: 'Cultural', año: 2003, icono: '🎨', ubicacion: 'Valparaiso' },
  { nombre: 'Oficinas Salitreras', tipo: 'Cultural', año: 2005, icono: '🏭', ubicacion: 'Tarapaca' },
  { nombre: 'Campamento Sewell', tipo: 'Cultural', año: 2006, icono: '⛏️', ubicacion: 'OHiggins' },
  { nombre: 'Qhapaq Nan', tipo: 'Cultural', año: 2014, icono: '🛤️', ubicacion: 'Norte de Chile' }
];

// Glosario cultural
const GLOSARIO = [
  { termino: 'FONDART', definicion: 'Fondo Nacional de Desarrollo Cultural y las Artes' },
  { termino: 'Patrimonio inmaterial', definicion: 'Tradiciones, expresiones orales, artes del espectaculo transmitidas de generacion en generacion' },
  { termino: 'Patrimonio material', definicion: 'Bienes culturales tangibles como edificios, monumentos, objetos y obras de arte' },
  { termino: 'Zona tipica', definicion: 'Area protegida por su valor urbanistico, arquitectonico o historico' },
  { termino: 'Monumento nacional', definicion: 'Bien declarado de interes publico por su valor historico, artistico o cientifico' },
  { termino: 'Consejo de Monumentos', definicion: 'Organismo que protege el patrimonio cultural y natural de Chile' },
  { termino: 'CNCA', definicion: 'Consejo Nacional de la Cultura y las Artes (hoy Ministerio de las Culturas)' },
  { termino: 'Tesoro Humano Vivo', definicion: 'Persona o comunidad portadora de tradiciones culturales relevantes' },
  { termino: 'DIBAM', definicion: 'Direccion de Bibliotecas, Archivos y Museos (hoy Servicio Nacional del Patrimonio)' },
  { termino: 'Industria creativa', definicion: 'Sectores que combinan creacion, produccion y comercializacion de contenidos culturales' },
  { termino: 'Mediacion cultural', definicion: 'Actividades que facilitan el acceso y comprension de manifestaciones artisticas' },
  { termino: 'Gestion cultural', definicion: 'Administracion y desarrollo de proyectos y organizaciones culturales' }
];

export default function CulturaPage() {
  const [busqueda, setBusqueda] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [montoProyecto, setMontoProyecto] = useState('');
  const [duracionMeses, setDuracionMeses] = useState('');
  const [tipoFondo, setTipoFondo] = useState('fondart');

  const centrosFiltrados = CENTROS.filter(centro =>
    (centro.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    centro.region.toLowerCase().includes(busqueda.toLowerCase()) ||
    centro.direccion.toLowerCase().includes(busqueda.toLowerCase())) &&
    (tipoFiltro === '' || centro.tipo === tipoFiltro)
  );

  const calcularPostulacion = () => {
    if (!montoProyecto || !duracionMeses) return null;

    const monto = parseInt(montoProyecto);
    const meses = parseInt(duracionMeses);

    const limites = {
      fondart: { min: 5000000, max: 80000000, honorarios: 0.35, gastos: 0.25 },
      regional: { min: 3000000, max: 30000000, honorarios: 0.40, gastos: 0.30 },
      libro: { min: 2000000, max: 50000000, honorarios: 0.30, gastos: 0.20 }
    };

    const limite = limites[tipoFondo as keyof typeof limites];
    const dentroLimite = monto >= limite.min && monto <= limite.max;
    const honorariosMax = Math.round(monto * limite.honorarios);
    const gastosMax = Math.round(monto * limite.gastos);
    const produccionMax = monto - honorariosMax - gastosMax;
    const montoPorMes = Math.round(monto / meses);

    return {
      dentroLimite,
      montoMin: limite.min,
      montoMax: limite.max,
      honorariosMax,
      gastosMax,
      produccionMax,
      montoPorMes
    };
  };

  const postulacion = calcularPostulacion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-8 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-4 block">🎭</span>
            <h1 className="text-4xl font-bold mb-2">Cultura</h1>
            <p className="text-rose-100">Centros culturales, museos, bibliotecas y fondos concursables</p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">🏛️ 16 Centros</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">🎨 8 Museos</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">🧮 Calculadora Fondos</span>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Centros Culturales */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🏛️</span> Buscador de Centros Culturales
          </h2>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Buscar por region, ciudad o nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
              />
              <select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="" className="bg-gray-800">Todos los tipos</option>
                <option value="Centro Cultural" className="bg-gray-800">Centro Cultural</option>
                <option value="Teatro" className="bg-gray-800">Teatro</option>
              </select>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Encontrados: {centrosFiltrados.length} centros
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {centrosFiltrados.map((centro) => (
              <motion.div
                key={centro.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-all"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white">{centro.nombre}</h3>
                  <span className="px-2 py-1 bg-pink-500/30 rounded text-xs text-pink-200">{centro.tipo}</span>
                </div>
                <p className="text-pink-300 text-sm">{centro.region}</p>
                <div className="mt-2 text-sm text-gray-300 space-y-1">
                  <p>📍 {centro.direccion}</p>
                  <p>🕐 {centro.horario}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Museos Nacionales */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🎨</span> Museos Destacados
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MUSEOS.map((museo, i) => (
              <motion.div
                key={museo.nombre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gradient-to-br from-rose-600/30 to-pink-600/30 rounded-xl p-5 border border-pink-500/30"
              >
                <div className="text-4xl mb-3">{museo.icono}</div>
                <h3 className="font-bold text-white">{museo.nombre}</h3>
                <p className="text-pink-300 text-sm">{museo.ubicacion}</p>
                <p className="text-gray-300 text-sm mt-2">{museo.descripcion}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs ${museo.entrada === 'Gratuita' ? 'bg-green-500/30 text-green-300' : 'bg-yellow-500/30 text-yellow-300'}`}>
                    {museo.entrada}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Calculadora de Postulacion */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🧮</span> Calculadora de Postulacion a Fondos
          </h2>

          <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-2xl p-6 border border-purple-500/30">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Tipo de fondo</label>
                <select
                  value={tipoFondo}
                  onChange={(e) => setTipoFondo(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="fondart" className="bg-gray-800">FONDART Nacional</option>
                  <option value="regional" className="bg-gray-800">FONDART Regional</option>
                  <option value="libro" className="bg-gray-800">Fondo del Libro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Monto a solicitar ($)</label>
                <input
                  type="number"
                  value={montoProyecto}
                  onChange={(e) => setMontoProyecto(e.target.value)}
                  placeholder="Ej: 15000000"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Duracion (meses)</label>
                <input
                  type="number"
                  value={duracionMeses}
                  onChange={(e) => setDuracionMeses(e.target.value)}
                  placeholder="Ej: 12"
                  min="1"
                  max="24"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            {postulacion && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-2xl ${postulacion.dentroLimite ? '✅' : '⚠️'}`}>
                    {postulacion.dentroLimite ? '✅' : '⚠️'}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {postulacion.dentroLimite ? 'Monto dentro de limites' : 'Monto fuera de limites'}
                  </h3>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  Rango permitido: ${postulacion.montoMin.toLocaleString()} - ${postulacion.montoMax.toLocaleString()}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Distribucion sugerida:</h4>
                    <div className="flex justify-between">
                      <span className="text-gray-300">👤 Honorarios (max):</span>
                      <span className="text-white font-semibold">${postulacion.honorariosMax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">📋 Gastos operacion (max):</span>
                      <span className="text-white font-semibold">${postulacion.gastosMax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">🎭 Produccion:</span>
                      <span className="text-white font-semibold">${postulacion.produccionMax.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-center">
                    <p className="text-sm text-white/80">Monto mensual promedio</p>
                    <p className="text-3xl font-bold text-white">${postulacion.montoPorMes.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4">* Porcentajes aproximados segun bases generales. Revisar bases especificas de cada convocatoria.</p>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Fondos de Cultura */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>💰</span> Fondos Concursables
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FONDOS.map((fondo, i) => (
              <motion.div
                key={fondo.nombre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/10 backdrop-blur rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{fondo.icono}</span>
                  <div>
                    <h3 className="font-bold text-white">{fondo.nombre}</h3>
                    <p className="text-pink-400 text-sm">{fondo.montos}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">{fondo.descripcion}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {fondo.areas.slice(0, 4).map((area, j) => (
                    <span key={j} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">{area}</span>
                  ))}
                </div>
                <p className="text-xs text-yellow-400">📅 {fondo.postulacion}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Bibliotecas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📚</span> Bibliotecas Publicas
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BIBLIOTECAS.map((biblioteca, i) => (
              <motion.div
                key={biblioteca.nombre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gradient-to-br from-rose-600/20 to-pink-600/20 rounded-xl p-4 border border-rose-500/30"
              >
                <h3 className="font-bold text-white">{biblioteca.nombre}</h3>
                <p className="text-pink-300 text-sm">{biblioteca.ubicacion}</p>
                <p className="text-gray-400 text-xs mt-1">📍 {biblioteca.direccion}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {biblioteca.servicios.map((s, j) => (
                    <span key={j} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">{s}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">🕐 {biblioteca.horario}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Patrimonio UNESCO */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🌍</span> Patrimonio de la Humanidad en Chile
          </h2>

          <div className="bg-gradient-to-r from-rose-600/20 to-purple-600/20 rounded-2xl p-6 border border-rose-500/30">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PATRIMONIO.map((sitio, i) => (
                <div key={sitio.nombre} className="flex items-center gap-4 bg-white/5 rounded-lg p-4">
                  <span className="text-4xl">{sitio.icono}</span>
                  <div>
                    <h4 className="font-bold text-white">{sitio.nombre}</h4>
                    <p className="text-sm text-gray-400">{sitio.ubicacion}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-purple-500/30 rounded text-xs text-purple-300">{sitio.tipo}</span>
                      <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">{sitio.año}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Glosario */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📖</span> Glosario Cultural
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {GLOSARIO.map((item, i) => (
              <motion.div
                key={item.termino}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition"
              >
                <span className="font-bold text-pink-400">{item.termino}</span>
                <p className="text-sm text-gray-400 mt-1">{item.definicion}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recursos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🔗</span> Recursos Oficiales
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { nombre: 'Ministerio de las Culturas', url: 'https://www.cultura.gob.cl', desc: 'Politicas culturales nacionales' },
              { nombre: 'Fondos de Cultura', url: 'https://www.fondosdecultura.cl', desc: 'Postulacion a fondos concursables' },
              { nombre: 'Patrimonio Cultural', url: 'https://www.patrimoniocultural.gob.cl', desc: 'Servicio Nacional del Patrimonio' },
              { nombre: 'Biblioteca Nacional', url: 'https://www.bibliotecanacional.gob.cl', desc: 'Recursos bibliograficos digitales' }
            ].map((recurso, i) => (
              <a
                key={i}
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-center transition"
              >
                <h3 className="font-bold text-white">{recurso.nombre}</h3>
                <p className="text-sm text-gray-400">{recurso.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>Cultura - Parte de <a href="https://newcool-informada.vercel.app" className="text-pink-400 hover:underline">NewCooltura Informada</a></p>
          <p className="text-sm mt-1">Acceso a la cultura es un derecho ciudadano</p>
        </div>
      </footer>
    </div>
  );
}

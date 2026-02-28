import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { propertiesAPI } from '../services/api'
import { ChevronLeft, ChevronRight, MapPin, Home, Square, Phone, Mail, AlertCircle, Loader } from 'lucide-react'

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    try {
      setLoading(true)
      const { data } = await propertiesAPI.getById(id)
      setProperty(data)
    } catch (err) {
      setError('Failed to fetch property details.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const nextImage = () => {
    if (property && property.images) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property && property.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader size={40} className="animate-spin text-blue-600" />
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">{error || 'Property not found'}</p>
          <button
            onClick={() => navigate('/properties')}
            className="btn-primary"
          >
            Back to Properties
          </button>
        </div>
      </div>
    )
  }

  const allImages = property.images || []

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8">
      <div className="container">
        {/* Back Button */}
        <button
          onClick={() => navigate('/properties')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back to Properties</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Image Section */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-4 h-96">
              {allImages.length > 0 ? (
                <img
                  src={allImages[currentImageIndex]}
                  alt={`Property ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No images available
                </div>
              )}

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {allImages.length > 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto mb-6">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      index === currentImageIndex
                        ? 'border-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Details Card */}
            <div className="card p-6 mb-6">
              <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Type</p>
                  <p className="text-lg font-semibold capitalize">{property.type}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Area</p>
                  <p className="text-lg font-semibold">{property.area}m²</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Price</p>
                  <p className="text-lg font-semibold text-blue-600">
                    ${property.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Location</p>
                  <p className="text-lg font-semibold flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {property.location}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Agent Info */}
          <div>
            {property.agent && (
              <div className="card p-6 mb-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">Agent Information</h3>

                {/* Agent Profile */}
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={property.agent.profilePicture || 'https://via.placeholder.com/80'}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {property.agent.name}
                    </p>
                    <p className="text-sm text-gray-600">Real Estate Agent</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  {property.agent.email && (
                    <div className="flex items-center space-x-3">
                      <Mail size={20} className="text-blue-600" />
                      <a
                        href={`mailto:${property.agent.email}`}
                        className="text-blue-600 hover:underline break-all"
                      >
                        {property.agent.email}
                      </a>
                    </div>
                  )}
                  {property.agent.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone size={20} className="text-blue-600" />
                      <a
                        href={`tel:${property.agent.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {property.agent.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <a
                    href={`mailto:${property.agent.email}?subject=Interested in ${property.title}`}
                    className="w-full btn-primary block text-center"
                  >
                    Send Email
                  </a>
                  {property.agent.phone && (
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="w-full btn-outline block text-center"
                    >
                      Call Agent
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="card p-6">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                ${property.price.toLocaleString()}
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Price per m²</span>
                  <span className="font-semibold">
                    ${(property.price / property.area).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

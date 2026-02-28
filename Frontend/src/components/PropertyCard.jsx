import { Link } from 'react-router-dom'
import { MapPin, Home, Zap, Square } from 'lucide-react'

export default function PropertyCard({ property }) {
  return (
    <Link to={`/properties/${property._id}`}>
      <div className="card overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden bg-gray-200">
          <img
            src={property.thumbnail}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
            ${property.price.toLocaleString()}
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm truncate">{property.location}</span>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <Home size={16} />
              <span>{property.type}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <Square size={16} />
              <span>{property.area}m²</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <Zap size={16} />
              <span>{property.amenities?.length || 0} amenities</span>
            </div>
          </div>

          {/* Agent */}
          {property.agent && (
            <div className="flex items-center space-x-2 border-t pt-3">
              <img
                src={property.agent.profilePicture || 'https://via.placeholder.com/40'}
                alt={property.agent.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-grow">
                <p className="text-sm font-semibold text-gray-800">{property.agent.name}</p>
                <p className="text-xs text-gray-600">{property.agent.phone || 'No phone'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

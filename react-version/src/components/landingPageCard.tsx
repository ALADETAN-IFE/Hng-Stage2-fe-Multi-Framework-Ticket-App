import { ClockIcon, ShieldIcon, TicketIcon } from "../assets/icons";

const LandingPageCards = () => {
    return (
        <>
        <article className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300" data-testid="test-react-feature-card-1">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <TicketIcon className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid="test-react-feature-title-1">Easy Ticket Management</h3>
            <p className="text-gray-600" data-testid="test-react-feature-description-1">Create, view, edit, and delete tickets with our intuitive interface.</p>
          </article>
          
          <article className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300" data-testid="test-react-feature-card-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <ClockIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid="test-react-feature-title-2">Real-time Updates</h3>
            <p className="text-gray-600" data-testid="test-react-feature-description-2">Stay updated with instant notifications and status changes.</p>
          </article>
          
          <article className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300" data-testid="test-react-feature-card-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <ShieldIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid="test-react-feature-title-3">Secure & Reliable</h3>
            <p className="text-gray-600" data-testid="test-react-feature-description-3">Your data is protected with enterprise-grade security measures.</p>
          </article>
        </>
    )
}

export default LandingPageCards
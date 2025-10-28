const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12" data-testid="test-react-footer">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4" data-testid="test-react-footer-title">TicketStressed</h3>
            <p className="text-gray-400 mb-6" data-testid="test-react-footer-description">Making ticket management stress-free for everyone</p>
            <nav className="flex justify-center space-x-6" data-testid="test-react-footer-links">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="test-react-privacy-link">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="test-react-terms-link">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="test-react-contact-link">Contact</a>
            </nav>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400" data-testid="test-react-copyright">&copy; {new Date().getFullYear()} TicketStressed. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer
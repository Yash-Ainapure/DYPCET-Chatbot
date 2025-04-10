export default function Footer() {
    return (
      <footer className="bg-college-blue text-white py-8">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p>D.Y. Patil College of Engineering</p>
            <p>Kolhapur, Maharashtra, India</p>
            <p>Phone: +91-123-456-7890</p>
            <p>Email: info@dypatilcollege.edu.in</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/admissions" className="hover:underline">Admissions</a></li>
              <li><a href="/academics" className="hover:underline">Academic Programs</a></li>
              <li><a href="/campus-life" className="hover:underline">Campus Life</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300">Facebook</a>
              <a href="#" className="hover:text-blue-300">Twitter</a>
              <a href="#" className="hover:text-blue-300">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-blue-700 pt-4">
          <p>&copy; 2024 D.Y. Patil College of Engineering. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Zap, Code2, Pen } from "lucide-react";

export const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Pen,
      title: "Write with Ease",
      description: "Create and publish engaging blog posts with our intuitive editor",
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Connect with other developers and share your knowledge",
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Lightning-fast loading speeds powered by Cloudflare Workers",
    },
    {
      icon: Code2,
      title: "Code Snippets",
      description: "Share code samples and technical insights with your readers",
    },
    {
      icon: BookOpen,
      title: "Rich Content",
      description: "Format your posts with markdown and bring your ideas to life",
    },
    {
      icon: ArrowRight,
      title: "SEO Optimized",
      description: "Your blogs are discoverable and rank well in search engines",
    },
  ];

  const stats = [
    { number: "10K+", label: "Developers" },
    { number: "50K+", label: "Blog Posts" },
    { number: "100K+", label: "Monthly Readers" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-gray-300">
        <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition">
          <img src="/dev.png" alt="DevBlogs" width={80} />
          <span className="text-2xl font-bold">DevBlogs.to</span>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/signin")}
            className="px-6 py-2 rounded-full border border-gray-700 text-gray-700 hover:bg-gray-800 hover:text-gray-50 transition font-medium"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 rounded-full bg-gray-800 text-gray-50 hover:bg-gray-700 transition font-medium"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Share Your <span className="bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">Developer</span> Stories
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            The modern blogging platform built for developers, by developers. Write, share, and connect with the global tech community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-50 rounded-full font-bold text-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Writing <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate("/blogs")}
              className="px-8 py-4 border-2 border-gray-700 text-gray-700 hover:bg-gray-800 hover:text-gray-50 rounded-full font-bold text-lg transition"
            >
              Explore Blogs
            </button>
          </div>
        </div>

        {/* Hero Image/Illustration Area */}
        <div className="mt-16 p-8 bg-gradient-to-b from-gray-200/50 to-transparent rounded-2xl border border-gray-300">
          <div className="h-64 flex items-center justify-center text-gray-600">
            <div className="text-center">
              <Code2 size={64} className="mx-auto mb-4 text-gray-700" />
              <p>Your stories matter. Share them with the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-12 py-16 bg-gray-100 border-y border-gray-300">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">{stat.number}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Everything You Need
          </h2>
          <p className="text-gray-600 text-center mb-16 text-lg">
            Powerful features designed to help developers share their expertise
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-white border border-gray-300 rounded-xl hover:border-gray-500 hover:bg-gray-100 transition group"
                >
                  <Icon className="w-12 h-12 text-gray-700 mb-4 group-hover:text-gray-800 transition" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-20 bg-gray-100 border-t border-gray-300">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Share Your Knowledge?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers who are already sharing their insights and building amazing content on DevBlogs.to
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-50 rounded-full font-bold text-lg transition transform hover:scale-105"
            >
              Create Your Account
            </button>
            <button
              onClick={() => navigate("/blogs")}
              className="px-8 py-4 border-2 border-gray-700 text-gray-700 hover:bg-gray-800 hover:text-gray-50 rounded-full font-bold text-lg transition"
            >
              Browse Blogs
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-300 px-6 md:px-12 ">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center">
            <div className="flex justify-center flex-col text-center mt-4">
              <h3 className="font-bold text-lg mb-2">DevBlogs.to</h3>
              <p className="text-gray-600">The platform for developer stories . <a className="text-gray-900 drop-shadow-xl shadow-gray-100" target="_blank" href="https://github.com/vishal0902/DevBlogs/">Github</a></p>
            </div>
           
       
            
          </div>
          <div className=" border-gray-300 pt-8 text-center text-gray-600">
            <p>&copy; 2026 DevBlogs.to. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

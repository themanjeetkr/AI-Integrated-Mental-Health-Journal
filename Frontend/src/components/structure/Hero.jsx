import react from 'react';

export default function Hero() {
    return(
        <>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-10 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-4">Welcome to Reflectify</h1>
            <p className="text-lg mb-6">Your personal journaling companion powered by AI. Capture your thoughts, emotions, and insights in one place.</p>
            <a href="/dashboard" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">Get Started</a>
        </div>
        
        </>
    )
}
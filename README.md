# Doctor Appointment Booking System

A modern, responsive web application that streamlines the process of booking medical appointments. This project showcases the integration of modern web technologies with AI-assisted development to create a user-friendly healthcare scheduling system.

## Project Overview

This application serves as a bridge between patients and healthcare providers, offering an intuitive interface for managing medical appointments. Built with modern web technologies and developed through an AI-driven approach, it demonstrates the potential of AI-assisted development in creating production-ready applications.

## Features

### For Patients
- Browse and filter doctors by specialty
- View detailed doctor profiles including ratings and availability
- Book and manage appointments with real-time availability checking
- Responsive design that works seamlessly on both desktop and mobile devices
- Accessible interface following WCAG guidelines for inclusive user experience

### Technical Features
- State-of-the-art component architecture using React and TypeScript
- Persistent storage of appointments using Zustand
- Responsive and accessible UI components from shadcn/ui
- Mobile-first design approach with drawer/modal adaptability
- Real-time availability tracking and conflict prevention

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
yarn
```

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui (Component Library)
- Zustand (State Management)
- Lucide Icons

## AI-Driven Development Process

This project was developed using a systematic AI-assisted approach:

### Initial Planning
1. Project requirements and features were defined through conversation with ChatGPT
2. Architecture and component structure were planned with AI assistance
3. Technology stack was selected based on AI recommendations for optimal performance and developer experience

### Development Workflow
1. **UI Components Generation**:
   - Used V0.dev to generate initial UI components
   - Components were customized and integrated into the project structure
   - Accessibility and responsiveness were prioritized in the design phase

2. **Implementation**:
   - Aider with Sonnet AI model assisted with:
     - Component logic implementation
     - State management setup
     - Accessibility improvements
     - Bug fixes and code optimization

3. **Iteration and Refinement**:
   - AI tools helped identify and implement best practices
   - Continuous improvement of component architecture
   - Enhancement of user experience based on AI suggestions

## Known Limitations

1. Authentication not implemented
2. Mock data used for doctors and availability
3. No real-time updates between multiple users
4. Limited error handling for edge cases

## Next Steps

- [ ] Implement user authentication
- [ ] Add real-time updates using WebSocket
- [ ] Integrate with a backend API
- [ ] Add email notifications for appointments
- [ ] Implement doctor availability management
- [ ] Add unit and integration tests

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License - see LICENSE file for details

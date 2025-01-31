import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/Rohitprofile.jpg';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isLoading, setIsLoading] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const fullText = "Full Stack Developer";
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const period = 2000;
  const [delta, setDelta] = useState(200);

  const skills = [
    { name: 'HTML5', level: 90, icon: 'fab fa-html5' },
    { name: 'CSS3', level: 65, icon: 'fab fa-css3-alt' },
    { name: 'JavaScript', level: 75, icon: 'fab fa-js' },
    { name: 'React', level: 70, icon: 'fab fa-react' },
    { name: 'Node.js', level: 75, icon: 'fab fa-node-js' },
    { name: 'MongoDB', level: 80, icon: 'fas fa-database' },
    { name: 'Express.js', level: 80, icon: 'fas fa-server' },
    { name: 'Git', level: 50, icon: 'fab fa-git-alt' },
    { name: 'RESTful APIs', level: 90, icon: 'fas fa-network-wired' },
    { name: 'TypeScript', level: 35, icon: 'fas fa-code' },
  ];

  const education = [
    {
      degree: "Bachelor's Degree in Information Technology",
      institution: "Mumbai University - Saraf College",
      year: "2021 - 2024",
      details: [
        "BSc-IT: CGPA 8.18",
        "Semester 6: CGPA 8.20",
        "Semester 5: CGPA 8.60"
      ]
    },
    {
      degree: "Higher Secondary Certificate (HSC) - Commerce",
      institution: "Durgadevi Saraf Junior College",
      year: "2020 - 2021",
      details: [
        "Percentage: 73%"
      ]
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "St.Xavier's High School",
      year: "2018 - 2019",
      details: [
        "Percentage: 58%"
      ]
    }
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
      alert('Message sent successfully!');
      e.target.reset();
    }, 1500);
  };

  // Add scroll animation for skills
  useEffect(() => {
    if (activeSection === 'skills') {
      const progressBars = document.querySelectorAll('.skill-progress');
      progressBars.forEach((bar) => {
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = bar.getAttribute('data-progress');
        }, 100);
      });
    }
  }, [activeSection]);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [displayText, isDeleting]);

  const tick = () => {
    let i = loopNum % fullText.length;
    let fullTextContent = fullText;
    let updatedText = isDeleting 
      ? fullTextContent.substring(0, displayText.length - 1)
      : fullTextContent.substring(0, displayText.length + 1);

    setDisplayText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullTextContent) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-sidebar">
        <div className="profile-intro">
          <div className="profile-image">
            <img src={profileImage} alt="Rohit Gupta" />
          </div>
          <h2 className="name-fade-in">Rohit Gupta</h2>
          <p className="designation">
            <span className="typing-text">{displayText}</span>
            <span className="cursor"></span>
          </p>
        </div>
        <nav className="portfolio-nav">
          <button 
            className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => setActiveSection('about')}
          >
            <i className="fas fa-user"></i>
            About Me
          </button>
          <button 
            className={`nav-item ${activeSection === 'education' ? 'active' : ''}`}
            onClick={() => setActiveSection('education')}
          >
            <i className="fas fa-graduation-cap"></i>
            Education
          </button>
          <button 
            className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveSection('skills')}
          >
            <i className="fas fa-code"></i>
            My Skills
          </button>
          <button 
            className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveSection('contact')}
          >
            <i className="fas fa-envelope"></i>
            Contact Me
          </button>
        </nav>
        <div className="social-links">
          <a 
            href="https://github.com/RohitGupta152" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link github"
            title="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/rohit-gupta1520/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link linkedin"
            title="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a 
            href="mailto:rohit703077@gmail.com" 
            className="social-link email"
            title="Email"
          >
            <i className="fas fa-envelope"></i>
          </a>
          <a 
            href="https://rohitgupta.great-site.net/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link website"
            title="Portfolio Website"
          >
            <i className="fas fa-globe"></i>
          </a>
        </div>
      </div>

      <div className="portfolio-content">
        {activeSection === 'about' && (
          <section className="about-section">
            <h2>About Me</h2>
            <p>
              Hello, I am Rohit Gupta, A dedicated and ambitious developer graduate with a specialization in BSC IT is seeking an opportunity to leverage programming skills to contribute to a challenging position within an organization. Eager to apply technical expertise and intelligence to drive organizational growth and success.
            </p>
            <div className="personal-info">
              <h3>Personal Details</h3>
              <ul>
                <li><strong>Full Name:</strong> Rohit Arvind Gupta</li>
                <li><strong>Date of Birth:</strong> January 28, 2004</li>
                <li><strong>Address:</strong> Dindoshi Municipal Colony Gen A.K.Vaidya Marg, Goregaon East Mumbai - 400065</li>
                <li><strong>Email:</strong> <a href="mailto:rohit703077@gmail.com">rohit703077@gmail.com</a></li>
                <li><strong>Phone:</strong> <a href="tel:+919653498068">+91 9653498068</a></li>
              </ul>
            </div>
            <div className="download-cv-container">
                <a 
                    href="https://drive.google.com/uc?export=download&id=1528J6HNRrzNHaeXhK4JZiGr-G6kIK_Of" 
                    className="download-cv-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fas fa-download"></i> Download CV
                </a>
            </div>
            <div className="freelance-banner">
              <i className="fas fa-laptop-code"></i>
              <h3>I'm Available for Freelancing</h3>
              <p>Looking for a developer to bring your ideas to life? Let's work together!</p>
              <button className="hire-btn" onClick={() => setActiveSection('contact')}>
                Hire Me
              </button>
            </div>
          </section>
        )}

        {activeSection === 'education' && (
          <section className="education-section">
            <h2>
              <i className="fas fa-graduation-cap section-icon"></i>
              Education
            </h2>
            <div className="education-timeline">
              {education.map((edu, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>{edu.degree}</h3>
                    <p className="institution">{edu.institution}</p>
                    <p className="year">
                      <i className="far fa-calendar-alt"></i> {edu.year}
                    </p>
                    <ul className="education-details">
                      {edu.details.map((detail, idx) => (
                        <li key={idx}>
                          <i className="fas fa-circle"></i>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="download-cv-container">
                <a 
                    href="https://drive.google.com/uc?export=download&id=1528J6HNRrzNHaeXhK4JZiGr-G6kIK_Of" 
                    className="download-cv-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fas fa-download"></i> Download CV
                </a>
            </div>
          </section>
        )}

        {activeSection === 'skills' && (
          <section className="skills-section">
            <h2>
              <i className="fas fa-code section-icon"></i>
              My Skills
            </h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <i className={`${skill.icon} skill-icon`}></i>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress"
                      data-progress={`${skill.level}%`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="download-cv-container">
                <a 
                    href="https://drive.google.com/uc?export=download&id=1528J6HNRrzNHaeXhK4JZiGr-G6kIK_Of" 
                    className="download-cv-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fas fa-download"></i> Download CV
                </a>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="contact-section">
            <h2>
              <i className="fas fa-envelope section-icon"></i>
              Contact Me
            </h2>
            <p className="contact-intro">
              I'm eager to hear from you! Whether you have a project in mind, some feedback on my work, or just want to chat, feel free to drop me a line.
            </p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <div className="input-icon">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Your Name" required />
                </div>
              </div>
              <div className="form-group">
                <div className="input-icon">
                  <i className="fas fa-envelope"></i>
                  <input type="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="form-group">
                <div className="input-icon">
                  <i className="fas fa-tag"></i>
                  <input type="text" placeholder="Subject" required />
                </div>
              </div>
              <div className="form-group">
                <div className="input-icon">
                  <i className="fas fa-comment-alt"></i>
                  <textarea placeholder="Your Message" rows="5" required></textarea>
                </div>
              </div>
              <button type="submit" className={`submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h4>Address</h4>
                    <p>Dindoshi Municipal Colony Gen A.K.Vaidya Marg, Goregaon East Mumbai</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone-alt"></i>
                  <div>
                    <h4>Contact Number</h4>
                    <p><a href="tel:+919653498068">+91 9653498068</a></p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Email Address</h4>
                    <p><a href="mailto:rohit703077@gmail.com">rohit703077@gmail.com</a></p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-globe"></i>
                  <div>
                    <h4>Website</h4>
                    <p><a href="https://rohitgupta.great-site.net/" target="_blank" rel="noopener noreferrer">Portfolio web</a></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Portfolio; 
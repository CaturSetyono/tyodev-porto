'use client';

import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { FaReact, FaNodeJs, FaDatabase, FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiExpress } from 'react-icons/si';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Skill {
  name: string;
  level: number; // 0-100
  icon: React.ElementType;
  color?: string; // Warna ikon atau progress bar
}

const skillsData: Skill[] = [
  { name: 'HTML5', level: 95, icon: FaHtml5, color: 'orange' },
  { name: 'CSS3 & TailwindCSS', level: 90, icon: SiTailwindcss, color: 'cyan' },
  { name: 'JavaScript & TypeScript', level: 85, icon: SiTypescript, color: 'yellow' },
  { name: 'React & Next.js', level: 88, icon: SiNextdotjs, color: 'blue' },
  { name: 'Node.js & Express.js', level: 80, icon: FaNodeJs, color: 'green' },
  { name: 'MongoDB & Databases', level: 75, icon: SiMongodb, color: 'green' },
  { name: 'Git & Version Control', level: 90, icon: FaGitAlt, color: 'red' },
  // Tambahkan keahlian lain di sini
];

const SkillsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        skillRefs.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={pageRef} className="py-5 min-h-[calc(100vh-56px)] dark:bg-gray-850">
      <Container>
        <h1 className="text-4xl font-bold text-center mb-5 text-gray-800 dark:text-white">Keahlian Saya</h1>
        <p className="text-lg text-center mb-8 text-gray-600 dark:text-gray-300">
          Berikut adalah beberapa teknologi dan alat yang saya kuasai dan sering gunakan dalam proyek-proyek saya.
        </p>
        <Row xs={1} md={2} lg={3} className="g-4">
          {skillsData.map((skill, index) => (
            <Col key={skill.name} ref={el => skillRefs.current[index] = el}>
              <Card className="h-100 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <skill.icon size={40} className="me-3" style={{ color: skill.color || 'inherit' }} />
                    <Card.Title className="mb-0 text-xl font-semibold text-gray-700 dark:text-gray-200">{skill.name}</Card.Title>
                  </div>
                  <ProgressBar 
                    now={skill.level} 
                    label={`${skill.level}%`} 
                    variant={getProgressBarVariant(skill.level)} 
                    className="mt-auto" 
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

// Helper function untuk varian progress bar berdasarkan level
const getProgressBarVariant = (level: number) => {
  if (level > 85) return 'success';
  if (level > 70) return 'info';
  if (level > 50) return 'warning';
  return 'danger';
};

export default SkillsPage;
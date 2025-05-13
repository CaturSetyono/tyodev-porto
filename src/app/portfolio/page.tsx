'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
// Import komponen Magic UI
import { Card, Button, Badge } from 'magicui-react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Nama Proyek 1',
    description: 'Deskripsi singkat tentang proyek ini, teknologi yang digunakan, dan fitur utamanya.',
    imageUrl: '/images/project1-placeholder.jpg',
    tags: ['React', 'Next.js', 'TailwindCSS'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 2,
    title: 'Nama Proyek 2',
    description: 'Proyek ini adalah tentang XYZ dan dibangun menggunakan ABC untuk mencapai tujuan Z.',
    imageUrl: '/images/project2-placeholder.jpg',
    tags: ['Node.js', 'Express', 'MongoDB'],
    liveUrl: '#',
  },
];

const PortfolioPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        projectRefs.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={pageRef} className="py-8 min-h-[calc(100vh-56px)] bg-white dark:bg-neutral-950">
      <Container>
        <h1 className="text-4xl font-bold text-center mb-4 text-neutral-900 dark:text-white tracking-tight">Portofolio Proyek</h1>
        <p className="text-lg text-center mb-10 text-neutral-500 dark:text-neutral-300">
          Berikut adalah beberapa proyek pilihan yang telah saya kerjakan.
        </p>
        <Row xs={1} md={2} lg={3} className="g-5">
          {projectsData.map((project, index) => (
            <Col key={project.id} ref={el => projectRefs.current[index] = el}>
              <Card className="h-full flex flex-col border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-neutral-50 dark:bg-neutral-900">
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <Card.Body className="flex flex-col flex-1 p-5">
                  <Card.Title className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">{project.title}</Card.Title>
                  <Card.Text className="text-neutral-600 dark:text-neutral-300 mb-4 flex-1">
                    {project.description}
                  </Card.Text>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <Badge key={tag} color="primary" variant="soft" className="text-xs px-2 py-1 rounded-md">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    {project.liveUrl && (
                      <Link href={project.liveUrl} target="_blank" passHref legacyBehavior>
                        <Button color="primary" variant="solid" size="sm" className="flex items-center gap-1">
                          <FaExternalLinkAlt /> Live Demo
                        </Button>
                      </Link>
                    )}
                    {project.repoUrl && (
                      <Link href={project.repoUrl} target="_blank" passHref legacyBehavior>
                        <Button color="neutral" variant="outline" size="sm" className="flex items-center gap-1">
                          <FaGithub /> Kode
                        </Button>
                      </Link>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {projectsData.length === 0 && (
          <p className="text-center text-neutral-400 mt-5">Belum ada proyek untuk ditampilkan.</p>
        )}
      </Container>
    </div>
  );
};

export default PortfolioPage;
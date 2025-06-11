import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const domain = await prisma.domain.findFirst();
  if (!domain) {
    await prisma.domain.createMany({
      data: [
        { name: 'Front-End Developer' },
        { name: 'Back-End Developer' },
        { name: 'Full-Stack Developer' },
        { name: 'Mobile App Developer' },
        { name: 'DevOps Engineer' },
        { name: 'AI/ML Engineer' },
        { name: 'Data Scientist' },
        { name: 'Game Developer' },
        { name: 'Security Engineer' },
        { name: 'Blockchain Developer' },
      ],
    });
    console.log('Domains added');
  } else {
    console.log('Domains are already created');
  }

  const skill = await prisma.skill.findFirst();
  if (!skill) {
    await prisma.skill.createMany({
      data: [
        { name: 'React' },
        { name: 'Next.js' },
        { name: 'Angular' },
        { name: 'Vue.js' },
        { name: 'Node.js' },
        { name: 'Express' },
        { name: 'Django' },
        { name: 'Flask' },
        { name: 'TensorFlow' },
        { name: 'PyTorch' },
        { name: 'Kubernetes' },
        { name: 'Docker' },
        { name: 'AWS' },
        { name: 'Git' },
        { name: 'SQL' },
        { name: 'MongoDB' },
        { name: 'TypeScript' },
        { name: 'Python' },
        { name: 'Java' },
        { name: 'C++' },
      ],
    });
    console.log('Skills added');
  } else {
    console.log('Skills are already created');
  }

  const field = await prisma.field.findFirst();
  if (!field) {
    await prisma.field.createMany({
      data: [
        { name: 'Web Development' },
        { name: 'Mobile Development' },
        { name: 'Data Science' },
        { name: 'Cybersecurity' },
        { name: 'Artificial Intelligence' },
        { name: 'DevOps' },
        { name: 'Cloud Computing' },
        { name: 'Blockchain' },
        { name: 'Game Development' },
        { name: 'Embedded Systems' },
      ],
    });
    console.log('Fields added');
  } else {
    console.log('Fields are already created');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

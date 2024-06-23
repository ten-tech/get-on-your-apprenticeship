import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

interface Student {
  name: string;
  house: string;
  alternate_names: string[];
}

// Route pour obtenir la liste des étudiants
router.get('/students', async (req, res) => {
  console.log('Received request for /students');
  try {
    const response = await fetch('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters');
    if (!response.ok) {
      throw new Error('Failed to fetch students from external API');
    }
    const data = await response.json() as Student[]; 
    let students = data.map((student) => ({
      name: student.name,
      house: student.house,
      nickname: student.alternate_names.length > 0 ? student.alternate_names[0] : null,
    }));

    const house = req.query.house as string;
    if (house) {
      students = students.filter(student => student.house === house);
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedStudents = students.slice(startIndex, endIndex);

    console.log('Sending students data:', paginatedStudents);
    res.json(paginatedStudents);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Route pour obtenir un étudiant aléatoire
router.get('/randomstudent', async (req, res) => {
  console.log('Received request for /randomstudent');
  try {
    const response = await fetch('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters');
    if (!response.ok) {
      throw new Error('Failed to fetch students from external API');
    }
    const data = await response.json() as Student[];
    const students = data.map((student) => ({
      name: student.name,
      house: student.house,
      nickname: student.alternate_names.length > 0 ? student.alternate_names[0] : null,
    }));
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    console.log('Sending random student data:', randomStudent);
    res.json(randomStudent);
  } catch (error) {
    console.error('Error fetching random student:', error);
    res.status(500).json({ error: 'Failed to fetch random student' });
  }
});

export default router;

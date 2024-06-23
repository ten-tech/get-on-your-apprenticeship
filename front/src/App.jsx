import { useState, useEffect } from 'react';
import logo from './assets/hogwarts.png';
import './App.css';
import Stats from './Stats'; // Importer le composant des statistiques

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function App() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [randomStudent, setRandomStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchStudents = async (page = 1, house) => {
    setCurrentPage(page);
    try {
      const url = house ? `${API_URL}/real/students?house=${house}&page=${page}` : `${API_URL}/real/students?page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  };

  const fetchRandomStudent = async () => {
    try {
      const response = await fetch(`${API_URL}/real/randomstudent`);
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      const data = await response.json();
      setRandomStudent(data);
    } catch (error) {
      console.error('Error fetching random student:', error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const getHouseClass = (house) => {
    switch (house) {
      case 'Gryffindor':
        return 'gryffindor';
      case 'Slytherin':
        return 'slytherin';
      case 'Hufflepuff':
        return 'hufflepuff';
      case 'Ravenclaw':
        return 'ravenclaw';
      default:
        return 'no-house';
    }
  };

  const handleHouseClick = (house) => {
    if (house === 'All Houses') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => student.house === house);
      setFilteredStudents(filtered);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Students List</h1>
        <p>Here is a list of all students:</p>
        <div className="filter-buttons">
          <button onClick={() => fetchStudents(1, 'Gryffindor')}>Gryffindor</button>
          <button onClick={() => fetchStudents(1, 'Slytherin')}>Slytherin</button>
          <button onClick={() => fetchStudents(1, 'Hufflepuff')}>Hufflepuff</button>
          <button onClick={() => fetchStudents(1, 'Ravenclaw')}>Ravenclaw</button>
          <button onClick={() => fetchStudents(1)}>All Houses</button>
        </div>
        <div className="student-list">
          {filteredStudents.length > 0 ? (
            <div className="student-table">
              {filteredStudents.map((student, index) => (
                <div key={index} className="student-row">
                  <div className={`student-name ${getHouseClass(student.house)}`}>
                    {student.name}
                  </div>
                  <div className={`student-house ${getHouseClass(student.house)}`}>
                    {student.house || 'No House'}
                  </div>
                  {student.nickname && (
                    <div className="student-nickname">{student.nickname}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            "Loading..."
          )}
        </div>
        <div className="pagination-buttons">
          <button onClick={() => fetchStudents(currentPage - 1)} disabled={currentPage <= 1}>Previous</button>
          <button onClick={() => fetchStudents(currentPage + 1)}>Next</button>
        </div>
        <button className="random-student-button" onClick={fetchRandomStudent}>Randomly Select a Student</button>
        {randomStudent && (
          <div className="random-student">
            <h2>Student Selected:</h2>
            <p>{randomStudent.name} - {randomStudent.house || 'No House'}</p>
          </div>
        )}
        <Stats students={students} onHouseClick={handleHouseClick} />
      </header>
    </div>
  );
}

export default App;

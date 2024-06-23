import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stats = ({ students, onHouseClick }) => {
  // Vérifier que 'students' est un tableau
  if (!Array.isArray(students)) {
    return null;
  }

  // Compter le nombre d'étudiants par maison
  const houseCounts = students.reduce((acc, student) => {
    acc[student.house] = (acc[student.house] || 0) + 1;
    return acc;
  }, {});

  // Définir les couleurs des maisons
  const houseColors = {
    Gryffindor: '#FF0000', // Rouge
    Slytherin: '#008000',  // Vert
    Hufflepuff: '#FFD700', // Or
    Ravenclaw: '#0000FF',  // Bleu
    'No House': '#800080', // Violet pour ceux qui n'ont pas de maison
  };

  // Configurer les données pour le graphique
  const data = {
    labels: Object.keys(houseCounts),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(houseCounts),
        backgroundColor: Object.keys(houseCounts).map(house => houseColors[house] || '#808080'),
        borderColor: Object.keys(houseCounts).map(house => houseColors[house] || '#808080'),
        borderWidth: 1,
      },
    ],
  };

  // Configurer les options pour le graphique
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Students per House',
      },
    },
    onClick: (evt, element) => {
      if (element.length > 0) {
        const index = element[0].index;
        const house = data.labels[index];
        onHouseClick(house);
      }
    },
  };

  return (
    <div>
      <h2>Student Statistics</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

// Ajouter la validation des props
Stats.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      house: PropTypes.string.isRequired,
      nickname: PropTypes.string,
    })
  ).isRequired,
  onHouseClick: PropTypes.func.isRequired,
};

export default Stats;

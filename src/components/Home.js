import React, { useState } from 'react';
import Card from './Card';
import DishModal from './DishModal';  // Import the DishModal component
import img1 from '../images/cf.png';
import img from '../images/cff.png';
import img33 from '../images/sss.png';
import img2 from '../images/2.png';
import img3 from '../images/333.png';
import img6 from '../images/6.png';
import img9 from '../images/9.png';
import img10 from '../images/10.png';
import img12 from '../images/12.png';
import img22 from '../images/22.png';
import img23 from '../images/23.png';
import img24 from '../images/24.png';
import { useNavigate } from 'react-router-dom';

const dishes = [
  { image: img3, title: 'Cold Coffee', description: 'Chilled, creamy coffee beverage bliss.', history: 'Cold Coffee, or iced coffee, is believed to have originated in Algeria around the 1840s as "Mazagran," a cold, sweetened coffee drink. The modern version, often referred to as Frappe, became popular in Greece during the 1950s. It\'s now enjoyed globally as a refreshing alternative to hot coffee.' },
  { image: img33, title: 'Espresso', description: 'Rich and bold espresso shot.', history: 'Espresso, a highly concentrated coffee, originated in Italy in the early 1900s. Luigi Bezzera is credited with inventing the first espresso machine in 1901, revolutionizing coffee consumption with a faster brewing method.' },
  { image: img2, title: 'Filter Coffee', description: 'Rich, aromatic South Indian brew.', history: 'South Indian Filter Coffee, also known as Kaapi, has been a staple in South Indian households for centuries. It is traditionally brewed using a metal filter and served in a unique set called "dabara and tumbler." Its roots trace back to the Indian adaptation of coffee introduced during the British colonial period.' },
  { image: img9, title: 'Chole Bhature', description: 'Spicy chickpeas with fried bread.', history: 'Chole Bhature is a popular North Indian dish that gained prominence in Punjab in the 1940s. The combination of spicy chickpea curry (chole) and fluffy fried bread (bhature) quickly became a favorite among street food lovers.' },
  { image: img10, title: 'Aloo Parotha', description: 'Stuffed with spiced mashed potatoes.', history: 'Aloo Paratha, a stuffed flatbread filled with spiced mashed potatoes, is a traditional dish from the Punjab region. It has been a beloved breakfast and comfort food in Indian households for generations.' },
  { image: img12, title: 'Dosa', description: 'Crispy savory pancake with chutneys.', history: 'Dosa, a crispy savory pancake made from fermented rice batter, dates back to the 1st century AD in South India. It is one of the oldest and most popular dishes in South Indian cuisine, often served with chutneys and sambar.' },
  { image: img22, title: 'Kulfi', description: 'Creamy, frozen Indian milk dessert.', history: 'Kulfi, a traditional Indian ice cream, dates back to the Mughal period in the 16th century. Made from slow-cooked milk, sugar, and flavored with cardamom or saffron, it is a rich and creamy dessert that has been cherished for centuries.' },
  { image: img23, title: 'Mango Lassi', description: 'Refreshing yogurt drink with mango.', history: 'Mango Lassi, a popular drink combining yogurt and mango, was introduced in South Asia in the 20th century. It is a refreshing beverage enjoyed in both India and Pakistan, especially during the hot summer months.' },
  { image: img24, title: 'Falooda', description: 'Flavored chilled vermicelli dessert.', history: 'Falooda, a cold dessert with vermicelli, originated in Persia and was brought to India during the Mughal Empire. It evolved into a layered dessert with ingredients like rose syrup, basil seeds, and jelly, becoming a favorite across South Asia.' },
  { image: img6, title: 'Samosa', description: 'Crispy, spiced potato-filled pastry.', history: 'Samosa, a crispy pastry filled with spiced potatoes, originated in the Middle East before making its way to India in the 13th century. It became a popular snack, often enjoyed with chutneys and tea.' },
  { image: img1, title: 'Butter Croissant', description: 'Flaky and buttery croissant.', history: 'The croissant, though now a staple of French cuisine, was inspired by the Austrian Kipferl. The modern croissant was created in France during the 19th century and has since become a beloved pastry worldwide.' },
  { image: img, title: 'Blueberry Pancakes', description: 'Fluffy pancakes with fresh blueberries.', history: 'Blueberry pancakes are a classic American breakfast dish, with the addition of blueberries being a modern twist. Pancakes have a long history, dating back to ancient Greece, but the combination with blueberries gained popularity in the 20th century.' },
];

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const openModal = (dish) => {
    setSelectedDish(dish);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDish(null);
  };
  
  const navigate = useNavigate();

  function orderNow(){
    navigate("/order")
  }

  return (
    <div>
      <div className="container">
        <h1>Welcome to Cafe Dine</h1>
        <p>Welcome to Cafe Dine, where every visit is a delightful journey for your senses.
          Nestled in the heart of Coimbatore, our cafe offers a cozy retreat from the bustling city life.
          Savor the rich aroma of freshly brewed coffee, indulge in our handcrafted pastries, and enjoy the warm,
          inviting ambiance that's perfect for catching up with friends, working remotely, or simply relaxing
          with a good book. With a commitment to using locally sourced, organic ingredients, we ensure that each
          bite and sip is not only delicious but also wholesome. Come, be a part of our community, and experience
          the magic of Cafe Dine today!
        </p>
        <h2>Our Famous Food Items</h2>
        <div className="card-container">
          {dishes.map((dish) => (
            <Card
              key={dish.title}
              image={dish.image}
              title={dish.title}
              description={dish.description}
              onImageClick={() => openModal(dish)}
            />
          ))}
        </div>
      </div>
      <DishModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        dish={selectedDish}
        orderNow={orderNow}
      />
    </div>
  );
}

export default Home;

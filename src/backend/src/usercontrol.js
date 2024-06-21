// controllers/userController.js
const userService = require('./userservices');
const User = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Address = require('./models/address');
const CartHistory = require('./models/cartHistory');
const OrderHistory = require('./models/orderHistory');
const Dress = require('./models/dress');


const getAllDresses = async (req, res) => {
    try {
      const dresses = await Dress.findAll();
      res.json(dresses);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getDressById = async (req, res) => {
    try {
      const dress = await Dress.findByPk(req.params.id);
      if (dress) {
        res.json(dress);
      } else {
        res.status(404).json({ message: 'Dress not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const createDress = async (req, res) => {
    try {
      const newDress = await Dress.create(req.body);
      res.status(201).json(newDress);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateDress = async (req, res) => {
    try {
      const dress = await Dress.findByPk(req.params.id);
      if (dress) {
        await dress.update(req.body);
        res.json(dress);
      } else {
        res.status(404).json({ message: 'Dress not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteDress = async (req, res) => {
    try {
      const dress = await Dress.findByPk(req.params.id);
      if (dress) {
        await dress.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Dress not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
const addToCart = async (req, res) => {
    try {
      const { userId, dressName, quantity, price } = req.body;
      console.log(price);
      const existingItem = await CartHistory.findOne({ where: { userId, orderName: dressName, orderQuantity: quantity ,price:price} });
      if (existingItem) {
        res.status(200).json({ message: 'Item already in cart', item: existingItem });
      } else {
        const cartItem = await CartHistory.create({ userId, orderName: dressName, orderQuantity: quantity ,price:price});
        res.status(201).json(cartItem);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getCartHistory = async (req, res) => {
    try {
      const { userId } = req.params;
      const cartItems = await CartHistory.findAll({ where: { userId } });
      res.status(200).json(cartItems);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteCartHistory = async (req, res) => {
    try {
      const { userId } = req.params;
      await CartHistory.destroy({ where: { userId } });
      res.status(204).send();
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const createAddress = async (req, res) => {
    try {
      const { email, fullName, streetAddress, city, state, zipCode, country, userId } = req.body;
  
      // Check if an address with the same details already exists
      const existingAddress = await Address.findOne({
        where: { email, fullName, streetAddress, city, state, zipCode, country, userId }
      });
  
      if (existingAddress) {
        // If an address already exists, return its addressId
        return res.status(200).json({ message: 'Address already exists', addressId: existingAddress.id });
      }
  
      // If no duplicate is found, create a new address
      const address = await Address.create(req.body);
      res.status(201).json({ message: 'Address created successfully', addressId: address.id, address });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  const getOrderConfirmationDetails = async (req, res) => {
    try {
      const { orderId, userId } = req.params;
  console.log( orderId, userId);
      // Fetch order details
      const order = await OrderHistory.findOne({ where: { orderId, userId } });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Fetch address details
      const address = await Address.findByPk(order.addressId);
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }
  
      // Fetch cart items
      const cartItems = await CartHistory.findAll({ where: { userId } });
  
      res.status(200).json({ order, address, cartItems });
    } catch (error) {
      console.error('Error fetching order confirmation details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  const createOrderHistory = async (req, res) => {
    const orderData = req.body;
    try {
      const order = await OrderHistory.create(orderData);
      console.log('Order history saved successfully:', order.toJSON());
      res.status(201).json({ message: 'Order history saved successfully', orderId: order.orderId });
    } catch (error) {
      console.error('Error saving order history:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  const getOrderHistoryById = async (req, res) => {
    try {
      const { userId } = req.params;
      const order = await OrderHistory.findAll({ where: { userId } });
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateAddress = async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await Address.update(req.body, { where: { id } });
      if (updated) {
        res.status(200).json({ message: 'Address updated successfully' });
      } else {
        res.status(404).json({ message: 'Address not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteAddress = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Address.destroy({ where: { id } });
      if (deleted) {
        res.status(200).json({ message: 'Address deleted successfully' });
      } else {
        res.status(404).json({ message: 'Address not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
const createUserControllerFn = async (req, res) => {
  try {
    const status = await userService.createUserDBService(req.body);
    if (status) {
      res.send({ status: true, message: 'User created successfully' });
    } else {
      res.send({ status: false, message: 'Error creating user' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const signUp = async (req, res) => {
    try {
      const { username, email,address, password } = req.body;
      // Check if user already exists
      let existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user with hashed password
      const newUser = await User.create({ username, email,address, password: hashedPassword });
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ where: { email } });
  
      // Check if user exists
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate and set JWT token
      const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
  
      // Send token and userId along with the response
      res.status(200).json({ message: 'Login successful', token, userId: user.id, username: user.username });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

module.exports = {getOrderHistoryById, deleteCartHistory, getOrderConfirmationDetails, createOrderHistory,getAllDresses, getDressById, createDress, updateDress, deleteDress ,addToCart, getCartHistory,createAddress, updateAddress, deleteAddress, createUserControllerFn, signUp, login };

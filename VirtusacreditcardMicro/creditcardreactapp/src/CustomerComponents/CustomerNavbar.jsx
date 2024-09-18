import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomerNavbar.css';
import API_BASE_URL from '../apiConfig';
import { formatDistanceToNow } from 'date-fns';
import { enIN } from 'date-fns/locale';

const CustomerNavbar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(5);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserId = localStorage.getItem('userId');
    setUserName(storedUserName);
    setUserRole(storedUserRole);
    fetchNotifications(storedUserId);
  }, []);

  const fetchNotifications = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const userNotifications = response.data.filter(notification => notification.UserId === parseInt(userId));
        setNotifications(userNotifications.reverse()); // Reverse the notifications to show the most recent ones first
        const unreadNotifications = userNotifications.filter(notification => !notification.IsRead).length;
        setUnreadCount(unreadNotifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/notifications/${notificationId}`,
        true,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setNotifications(notifications.map(notification =>
        notification.NotificationId === notificationId
          ? { ...notification, IsRead: true }
          : notification
      ));
      setUnreadCount(unreadCount - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const logout = () => {
    navigate('/login');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const convertToIST = (dateString) => {
    const date = new Date(dateString);
    const ISTOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    return new Date(date.getTime() + ISTOffset);
  };

  const getTimeAgo = (createdAt) => {
    const istDate = convertToIST(createdAt);
    return formatDistanceToNow(istDate, { addSuffix: true, locale: enIN });
  };

  // Pagination Logic
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

  const nextPage = () => {
    if (currentPage < Math.ceil(notifications.length / notificationsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <nav className='usernav'>
      <h1 className="site-title" id="heading">
        <Link to="/home" style={{ color: 'inherit', textDecoration: 'inherit' }}>Credit Card Application</Link>
      </h1>
      <ul className="nav-links">
        <li><p className="user-role">{userName} / {userRole}</p></li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/appliedcreditcard">Applied CreditCards</Link></li>
        <li><Link to="/creditcardapplications">Add CreditCards</Link></li>
        <li className="dropdown">
          <span className="dropdown-label">Feedback</span>
          <ul className="dropdown-menu">
            <li><Link to="/userpostfeedback">Post Feedback</Link></li>
            <li><Link to="/usermyfeedback">View MyFeedback</Link></li>
          </ul>
        </li>
        <li className="notifications-icon">
          <span onClick={toggleNotifications}>
            <i className="bell-icon">&#128276;</i>
            {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
          </span>
          {showNotifications && (
            <div className="notifications-dropdown">
              {notifications.length === 0 ? (
                <p>No new notifications</p>
              ) : (
                <>
                  <ul>
                    {currentNotifications.map(notification => (
                      <li
                        key={notification.NotificationId}
                        className={notification.IsRead ? "read" : "unread"}
                        onClick={() => markAsRead(notification.NotificationId)}
                      >
                        <span className="notification-icon">
                          {notification.Message.includes("Approved") ? '✔️' : '❌'}
                        </span>
                        {`${notification.Message} --- ${getTimeAgo(notification.CreatedAt)}`}
                      </li>
                    ))}
                  </ul>
                  <div className="pagination-controls">
                    <button onClick={prevPage} disabled={currentPage === 1}>
                      &lt; Prev
                    </button>
                    <button onClick={nextPage} disabled={currentPage >= Math.ceil(notifications.length / notificationsPerPage)}>
                      Next &gt;
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </li>
        <li>
          <button className="button button-logout" onClick={() => setShowLogoutPopup(true)}>
            Logout
          </button>
        </li>
      </ul>

      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="logout-popup-content">
            <p>Are you sure you want to logout?</p>
            <button onClick={() => { logout(); setShowLogoutPopup(false); }} className="button button-yes">
              Yes, Logout
            </button>
            <button onClick={() => setShowLogoutPopup(false)} className="button button-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default CustomerNavbar;


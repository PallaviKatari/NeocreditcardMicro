import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store';
import Login from '../Components/Login';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Signup from '../Components/Signup';
import ErrorPage from '../Components/ErrorPage';
import HomePage from '../Components/HomePage';
import ViewAllCreditCards from '../CustomerComponents/ViewAllCreditCards';
import CreditCardApplicationForm from '../CustomerComponents/CreditCardApplicationForm';
import CustomerPostFeedback from '../CustomerComponents/CustomerPostFeedback';
import AppliedCreditCards from '../CustomerComponents/AppliedCreditCards';
import ViewCreditCards from '../CreditCardManagerComponents/ViewCreditCards';
import ViewCreditCardDisbursement from '../CreditCardManagerComponents/ViewCreditCardDisbursement';
import CreditCardRequest from '../CreditCardManagerComponents/CreditCardRequest';
import CreditCardForm from '../CreditCardManagerComponents/CreditCardForm';
import ViewFeedback from '../BranchManagerComponents/ViewFeedback';
import CreditCardsApproval from '../BranchManagerComponents/CreditCardsApproval';

jest.mock('axios');

// Setup QueryClient
const queryClient = new QueryClient();

describe('Login Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderLoginComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Login {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  
  test('frontend_login_component_renders_the_with_login_heading', () => {
    renderLoginComponent();

  
    const loginHeadings = screen.getAllByText(/Login/i);
    expect(loginHeadings.length).toBeGreaterThan(0);

  });


  test('frontend_login_component_displays_validation_messages_when_login_button_is_clicked_with_empty_fields', () => {
    renderLoginComponent();

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

   
});
describe('Signup Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSignupComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Signup {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };
  test('frontend_signup_component_renders_with_signup_heading', () => {
    renderSignupComponent();

    const signupHeadings = screen.getAllByText(/Signup/i);
   expect(signupHeadings.length).toBeGreaterThan(0);

  });

  test('frontend_signup_component_displays_validation_messages_when_submit_button_is_clicked_with_empty_fields', () => {
    renderSignupComponent();

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(screen.getByText('User Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Mobile Number is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password is required')).toBeInTheDocument();
  });

  test('frontend_signup_component_displays_error_when_passwords_do_not_match', () => {
    renderSignupComponent();

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password456' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});

describe('ErrorPage Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const renderErrorComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ErrorPage {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };
  test('frontend_errorpage_component_renders_with_error_heading', () => {
    renderErrorComponent();
    const headingElement = screen.getByText(/Oops! Something Went Wrong/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('frontend_errorpage_component_renders_with_error_content', () => {
    renderErrorComponent();
    const paragraphElement = screen.getByText(/Please try again later./i);
    expect(paragraphElement).toBeInTheDocument();
  });
});
describe('Home Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const renderHomeComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <HomePage {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  
  test('frontend_home_component_renders_with_heading', () => {
    renderHomeComponent();
    const headingElement = screen.getAllByText(/CreditCardVault/i);
    expect(headingElement.length).toBeGreaterThan(0);

  });
  test('frontend_home_component_renders_with_contact_us', () => {
    renderHomeComponent();
    const headingElement = screen.getAllByText(/Contact Us/i);
    expect(headingElement.length).toBeGreaterThan(0);

  });
});

describe('ViewAllCreditCards Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderViewAllCreditCardsComponent = (props = {}) => {
    const queryClient = new QueryClient(); // Create a new QueryClient instance
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ViewAllCreditCards {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_viewallcreditcards_customer_component_renders_the_with_heading', () => {
    renderViewAllCreditCardsComponent();

    const headingElement = screen.getByText(/Available CreditCards/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('frontend_viewallcreditcards_customer_component_renders_the_table', () => {
    renderViewAllCreditCardsComponent();

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
});

describe('CreditCardApplicationForm Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  const renderCreditCardApplicationFormComponent = (props = {}) => {
    const queryClient = new QueryClient(); // Create a new QueryClient instance
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <CreditCardApplicationForm {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_creditcardapplicationform_customer_component_renders_the_with_heading', () => {
    renderCreditCardApplicationFormComponent();

    const headingElement = screen.getByText(/CreditCard Application Form/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('frontend_creditcardapplicationform_customer_component_displays_required_validation_messages', async () => {
    renderCreditCardApplicationFormComponent();

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(await screen.findByText('CreditCard amount is required')).toBeInTheDocument();
    expect(await screen.findByText('Tenure is required')).toBeInTheDocument();
    expect(await screen.findByText('Employment status is required')).toBeInTheDocument();
    expect(await screen.findByText('Annual income is required')).toBeInTheDocument();
    expect(await screen.findByText('Remarks are required')).toBeInTheDocument();
    expect(await screen.findByText('Proof is required')).toBeInTheDocument();
  });
});

describe('CustomerPostFeedback Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  const renderCustomerPostFeedbackComponent = (props = {}) => {
    const queryClient = new QueryClient(); // Create a new QueryClient instance
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <CustomerPostFeedback {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_customerpostfeedback_customer_component_renders_the_with_heading', () => {
    renderCustomerPostFeedbackComponent();

    const headingElement = screen.getByText(/Submit Your Feedback/i);
    expect(headingElement).toBeInTheDocument();
  });
});


describe('AppliedCreditCards Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  
  const renderAppliedCreditCardsComponent = (props = {}) => {
    const queryClient = new QueryClient(); // Create a new QueryClient instance
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <AppliedCreditCards {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_appliedcreditcards_customer_component_renders_the_with_heading', () => {
    renderAppliedCreditCardsComponent();
    const headingElements = screen.getAllByText(/Applied CreditCards/i);
    expect(headingElements.length).toBeGreaterThan(1);

  });

test('frontend_appliedcreditcards_customer_component_renders_the_table', () => {
  renderAppliedCreditCardsComponent();

  const tableElement = screen.getByRole('table');
  expect(tableElement).toBeInTheDocument();
});
});


describe('ViewCreditCards Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderViewCreditCardsComponent = (props = {}) => {
    const queryClient = new QueryClient(); // Create a new QueryClient instance
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ViewCreditCards {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_viewcreditcards_creditcardmanager_component_renders_the_with_heading', () => {
    renderViewCreditCardsComponent();

    const headingElement = screen.getAllByText(/CreditCards/i);
    expect(headingElement.length).toBeGreaterThan(1);
  });

  test('frontend_viewcreditcards_creditcardmanager_component_renders_the_table', () => {
    renderViewCreditCardsComponent();

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
});

describe('ViewCreditCardDisbursement Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderViewCreditCardDisbursementComponent = (props = {}) => {
    const queryClient = new QueryClient(); // Create a new QueryClient instance
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ViewCreditCardDisbursement {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_viewcreditcarddisbursement_creditcardmanager_component_renders_the_with_heading', () => {
    renderViewCreditCardDisbursementComponent();

    const headingElement = screen.getByText(/CreditCard Disbursements/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('frontend_viewcreditcarddisbursement_creditcardmanager_component_renders_the_table', () => {
    renderViewCreditCardDisbursementComponent();

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
});

describe('CreditCardRequest Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderCreditCardRequestComponent = (props = {}) => {
    const queryClient = new QueryClient(); // Create a new QueryClient instance
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <CreditCardRequest {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_creditcardrequest_creditcardmanager_component_renders_the_with_heading', () => {
    renderCreditCardRequestComponent();

    const headingElement = screen.getByText(/CreditCard Requests for Approval/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('frontend_creditcardrequest_creditcardmanager_component_renders_the_table', () => {
    renderCreditCardRequestComponent();

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
});

describe('CreditCardForm Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderCreditCardFormComponent = (props = {}) => {
    const queryClient = new QueryClient(); // Create a new QueryClient instance
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <CreditCardForm {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_creditcardform_creditcard_manager_component_renders_the_with_create_heading', () => {
    renderCreditCardFormComponent();

    const headingElement = screen.getByText(/Create New CreditCard/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('frontend_creditcardform_creditcard_manager_component_displays_required_validation_messages', async () => {
    renderCreditCardFormComponent();

    fireEvent.click(screen.getByRole('button', { name: /Add CreditCard/i }));

    expect(await screen.findByText('CreditCard Type is required')).toBeInTheDocument();
    expect(await screen.findByText('Description is required')).toBeInTheDocument();
    expect(await screen.findByText('Interest Rate is required')).toBeInTheDocument();
    expect(await screen.findByText('Maximum Amount is required')).toBeInTheDocument();
    expect(await screen.findByText('Minimum Amount is required')).toBeInTheDocument();
  });
});

describe('ViewFeedback Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  const renderViewFeedbackComponent = (props = {}) => {
    const queryClient = new QueryClient(); // Create a new QueryClient instance
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ViewFeedback {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_viewfeedback_branchmanager_component_renders_the_heading', () => {
    renderViewFeedbackComponent();

    const headingElement = screen.getByText(/Customer Feedbacks/i);
    expect(headingElement).toBeInTheDocument();
  });
});

describe('CreditCardsApproval Component', () => {
  const renderCreditCardsApprovalComponent = (props = {}) => {
    const queryClient = new QueryClient(); // Create a new QueryClient instance
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <CreditCardsApproval {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_creditcardsapproval_branchmanager_component_renders_the_heading', () => {
    renderCreditCardsApprovalComponent();
    
    const headingElement = screen.getAllByText(/CreditCards/i);
    expect(headingElement.length).toBeGreaterThan(1);
  });

  test('frontend_creditcardsapproval_branchmanager_component_renders_the_table', () => {
    renderCreditCardsApprovalComponent();

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
});

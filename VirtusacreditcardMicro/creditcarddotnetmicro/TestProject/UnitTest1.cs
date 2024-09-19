using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Reflection;

public class Tests
{
    private HttpClient _httpClient;
    private HttpClient _httpClient1;
    private HttpClient _httpClient2;
    private HttpClient _httpClient3;
    private HttpClient _httpClient4;

    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
        _httpClient1 = new HttpClient();
        _httpClient2 = new HttpClient();
        _httpClient3 = new HttpClient();

        _httpClient4 = new HttpClient();

        _httpClient.BaseAddress = new Uri("http://localhost:8080");
        _httpClient1.BaseAddress = new Uri("http://localhost:8079");
        _httpClient2.BaseAddress = new Uri("http://localhost:8078");
        _httpClient3.BaseAddress = new Uri("http://localhost:8077");
        _httpClient4.BaseAddress = new Uri("http://localhost:8076");
    }


    [Test, Order(1)]
    public async Task Backend_Test_Post_Method_Register_Customer_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Customer\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        Console.WriteLine(response.StatusCode);
        string responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }

    [Test, Order(2)]
    public async Task Backend_Test_Post_Method_Login_Customer_Returns_HttpStatusCode_OK()
    {

        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Customer\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
    }

    [Test, Order(3)]
    public async Task Backend_Test_Post_Method_Register_CreditCardOfficer_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"CreditCardOfficer\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        Console.WriteLine(response.StatusCode);
        string responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }

    [Test, Order(4)]
    public async Task Backend_Test_Post_Method_Login_CreditCardOfficer_Returns_HttpStatusCode_OK()
    {

        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"CreditCardOfficer\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
    }

    [Test, Order(5)]
    public async Task Backend_Test_Post_Method_Register_BranchManager_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"BranchManager\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        Console.WriteLine(response.StatusCode);
        string responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }

    [Test, Order(6)]
    public async Task Backend_Test_Post_Method_Login_BranchManager_Returns_HttpStatusCode_OK()
    {

        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"BranchManager\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
    }

    [Test, Order(7)]
    public async Task Backend_Test_Post_Method_Register_Returns_HttpStatusCode_BadRequest_For_Invalid_User_Role()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"InvalidRole\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        Console.WriteLine(response.StatusCode);
        string responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
        Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Test, Order(8)]
    public async Task Backend_Test_Post_CreditCard_By_CreditCardOfficer_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"CreditCardOfficer\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        string uniqueTitle = Guid.NewGuid().ToString();

        // Use a dynamic and unique CardType for admin (appending timestamp)
        string uniqueCardType = $"creditcard_{uniqueTitle}";

        string creditCardJson = $"{{\"CardType\":\"{uniqueCardType}\",\"InterestRate\":10,\"CreditLimit\":1000000,\"AnnualFee\":10000,\"MinimumPaymentPercentage\":12,\"CashAdvanceFee\":3000,\"GracePeriodDays\":30,\"Status\":\"Active\",\"LatePaymentFee\":500}}";
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage creditCardResponse = await _httpClient.PostAsync("/api/ms/creditcards",
        new StringContent(creditCardJson, Encoding.UTF8, "application/json"));

        Console.WriteLine("CreditCard Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.OK, creditCardResponse.StatusCode);
    }

    [Test, Order(9)]
    public async Task Backend_Test_Post_CreditCard_By_Customer_Returns_Forbidden()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Customer\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        string uniqueTitle = Guid.NewGuid().ToString();

        // Use a dynamic and unique CardType for admin (appending timestamp)
        string uniqueCardType = $"creditcard_{uniqueTitle}";

        string creditCardJson = $"{{\"CardType\":\"{uniqueCardType}\",\"InterestRate\":10,\"CreditLimit\":1000000,\"AnnualFee\":10000,\"MinimumPaymentPercentage\":12,\"CashAdvanceFee\":3000,\"GracePeriodDays\":30,\"Status\":\"Active\",\"LatePaymentFee\":500}}";
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage creditCardResponse = await _httpClient.PostAsync("/api/creditcards",
        new StringContent(creditCardJson, Encoding.UTF8, "application/json"));

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.Forbidden, creditCardResponse.StatusCode);
    }

    [Test, Order(10)]
    public async Task Backend_Test_Post_CreditCard_By_BranchManager_Returns_Forbidden()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"BranchManager\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        string uniqueTitle = Guid.NewGuid().ToString();

        // Use a dynamic and unique CardType for admin (appending timestamp)
        string uniqueCardType = $"creditcard_{uniqueTitle}";

        string creditCardJson = $"{{\"CardType\":\"{uniqueCardType}\",\"InterestRate\":10,\"CreditLimit\":1000000,\"AnnualFee\":10000,\"MinimumPaymentPercentage\":12,\"CashAdvanceFee\":3000,\"GracePeriodDays\":30,\"Status\":\"Active\",\"LatePaymentFee\":500}}";
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage creditCardResponse = await _httpClient.PostAsync("/api/creditcards",
        new StringContent(creditCardJson, Encoding.UTF8, "application/json"));

        Console.WriteLine("CreditCard Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.Forbidden, creditCardResponse.StatusCode);
    }

    [Test, Order(11)]
    public async Task Backend_Test_Get_All_CreditCards_With_Token_By_CreditCard_Officer_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardofficer_{uniqueId}";
        string uniqueEmail = $"creditcardofficer_{uniqueId}@gmail.com";

        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"CreditCardOfficer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient.GetAsync("/api/creditcards");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.OK, creditCardResponse.StatusCode);
    }

    [Test, Order(12)]
    public async Task Backend_Test_Get_All_CreditCards_With_Token_By_Customer_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardoffiecr_{uniqueId}";
        string uniqueEmail = $"creditcardofficer_{uniqueId}@gmail.com";

        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Customer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient.GetAsync("/api/creditcards");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.OK, creditCardResponse.StatusCode);
    }

    [Test, Order(13)]
    public async Task Backend_Test_Get_All_CreditCards_With_Token_By_BranchManager_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardofficer_{uniqueId}";
        string uniqueEmail = $"creditcardofficer_{uniqueId}@gmail.com";

        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"BranchManager\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient.GetAsync("/api/creditcards");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.OK, creditCardResponse.StatusCode);
    }

    [Test, Order(14)]
    public async Task Backend_Test_Get_All_CreditCards_Without_Token_Returns_HttpStatusCode_Unauthorized()
    {
        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient.GetAsync("/api/creditcards");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.Unauthorized, creditCardResponse.StatusCode);
    }

    [Test, Order(15)]
    public async Task Backend_Test_Get_All_CreditCard_Applications_With_Token_By_CreditCard_Manager_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardofficer_{uniqueId}";
        string uniqueEmail = $"creditcardofficer_{uniqueId}@gmail.com";

        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"CreditCardOfficer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient.GetAsync("/api/creditcardapplication");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.OK, creditCardResponse.StatusCode);
    }

    [Test, Order(16)]
    public async Task Backend_Test_Get_All_CreditCard_Applications_With_Token_By_Customer_Returns_HttpStatusCode_Forbidden()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardofficer_{uniqueId}";
        string uniqueEmail = $"creditcardofficer{uniqueId}@gmail.com";

        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Customer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient.GetAsync("/api/creditcardapplication");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.Forbidden, creditCardResponse.StatusCode);
    }

    [Test, Order(17)]
    public async Task Backend_Test_Get_All_CreditCard_Applications_With_Token_By_BranchManager_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardofficer_{uniqueId}";
        string uniqueEmail = $"creditcardofficer_{uniqueId}@gmail.com";

        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"BranchManager\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient.GetAsync("/api/creditcardapplication");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.OK, creditCardResponse.StatusCode);
    }

    [Test, Order(18)]
    public async Task Backend_Test_Get_All_CreditCard_Applications_Without_Token_Returns_HttpStatusCode_Unauthorized()
    {
        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient.GetAsync("/api/creditcardapplication");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.Unauthorized, creditCardResponse.StatusCode);
    }

    [Test, Order(19)]
    public async Task Backend_Test_Get_All_CreditCard_Disbursements_With_Token_By_CreditCard_Officer_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardmanager_{uniqueId}";
        string uniqueEmail = $"creditcardmanager_{uniqueId}@gmail.com";

        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"CreditCardOfficer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loan disbursements
        HttpResponseMessage disbursementResponse = await _httpClient.GetAsync("/api/creditcarddisbursements");

        Console.WriteLine("Credit Card Disbursement Response: " + disbursementResponse);

        Assert.AreEqual(HttpStatusCode.OK, disbursementResponse.StatusCode);
    }
    [Test, Order(20)]
    public async Task Backend_Test_Get_All_CreditCard_Disbursements_With_Token_By_Branch_Manager_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"branchmanager_{uniqueId}";
        string uniqueEmail = $"branchmanager{uniqueId}@gmail.com";

        // Register a new user with the role of "Branch Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"BranchManager\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loan disbursements
        HttpResponseMessage disbursementResponse = await _httpClient.GetAsync("/api/creditcarddisbursements");

        Console.WriteLine("Credit Card Disbursement Response: " + disbursementResponse);

        Assert.AreEqual(HttpStatusCode.OK, disbursementResponse.StatusCode);
    }
    [Test, Order(21)]
    public async Task Backend_Test_Get_All_CreditCard_Disbursements_With_Token_By_Customer_Returns_HttpStatusCode_Forbidden()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"customer_{uniqueId}";
        string uniqueEmail = $"customer{uniqueId}@gmail.com";

        // Register a new user with the role of "Customer"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Customer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loan disbursements
        HttpResponseMessage disbursementResponse = await _httpClient.GetAsync("/api/creditcarddisbursements");

        Console.WriteLine("CreditCard Disbursement Response: " + disbursementResponse);

        Assert.AreEqual(HttpStatusCode.Forbidden, disbursementResponse.StatusCode);
    }

    [Test, Order(22)]
    public async Task Backend_Test_Get_All_CreditCard_Disbursements_Without_Token_Returns_HttpStatusCode_Unauthorized()
    {
        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient.GetAsync("/api/creditcarddisbursements");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.Unauthorized, creditCardResponse.StatusCode);
    }

    [Test, Order(23)]
    public async Task Backend_Test_Get_All_Feedbacks_With_Token_By_CreditCard_Officer_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardofficer_{uniqueId}";
        string uniqueEmail = $"creditcardofficer_{uniqueId}@gmail.com";


        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"CreditCardOfficer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all feedbacks
        HttpResponseMessage feedbackResponse = await _httpClient.GetAsync("/api/feedback");

        Console.WriteLine("Feedback Response: " + feedbackResponse);

        Assert.AreEqual(HttpStatusCode.OK, feedbackResponse.StatusCode);
    }

    [Test, Order(24)]
    public async Task Backend_Test_Get_All_Feedbacks_With_Token_By_Branch_Manager_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"branchmanager_{uniqueId}";
        string uniqueEmail = $"branchmanager{uniqueId}@gmail.com";

        // Register a new user with the role of "Branch Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"BranchManager\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all feedbacks
        HttpResponseMessage feedbackResponse = await _httpClient.GetAsync("/api/feedback");

        Console.WriteLine("Feedback Response: " + feedbackResponse);

        Assert.AreEqual(HttpStatusCode.OK, feedbackResponse.StatusCode);
    }


    [Test, Order(25)]
    public async Task Backend_Test_Get_All_Feedbacks_With_Token_By_Customer_Returns_HttpStatusCode_Forbidden()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"customer_{uniqueId}";
        string uniqueEmail = $"customer{uniqueId}@gmail.com";

        // Register a new user with the role of "Customer"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Customer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all feedbacks
        HttpResponseMessage feedbackResponse = await _httpClient.GetAsync("/api/feedback");

        Console.WriteLine("Feedback Response: " + feedbackResponse);

        Assert.AreEqual(HttpStatusCode.Forbidden, feedbackResponse.StatusCode);
    }


    [Test, Order(26)]
    public async Task Backend_Test_Get_All_Feedbacks_Without_Token_Returns_HttpStatusCode_Unauthorized()
    {
        // Make the GET request to retrieve all feedbacks without a token
        HttpResponseMessage feedbackResponse = await _httpClient.GetAsync("/api/feedback");

        Console.WriteLine("Feedback Response: " + feedbackResponse);

        Assert.AreEqual(HttpStatusCode.Unauthorized, feedbackResponse.StatusCode);
    }

    [Test, Order(27)]
    public async Task Backend_Test_Get_All_Notifications_Without_Token_Returns_HttpStatusCode_Unauthorized()
    {
        // Make the GET request to retrieve all notifications without a token
        HttpResponseMessage notificationResponse = await _httpClient.GetAsync("/api/notifications");

        Console.WriteLine("Notification Response: " + notificationResponse);

        Assert.AreEqual(HttpStatusCode.Unauthorized, notificationResponse.StatusCode);
    }

    [Test, Order(28)]
    public async Task Backend_MicroServices_Test_Get_All_Feedbacks_With_Token_By_CreditCard_Officer_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardofficer_{uniqueId}";
        string uniqueEmail = $"creditcardofficer_{uniqueId}@gmail.com";

        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"CreditCardOfficer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient2.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all feedbacks
        HttpResponseMessage feedbackResponse = await _httpClient2.GetAsync("/api/ms/feedback");

        Console.WriteLine("Feedback Response: " + feedbackResponse);

        Assert.AreEqual(HttpStatusCode.OK, feedbackResponse.StatusCode);
    }

    [Test, Order(29)]
    public async Task Backend_MicroServices_Test_Get_All_Feedbacks_With_Token_By_Branch_Manager_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"branchmanager_{uniqueId}";
        string uniqueEmail = $"branchmanager{uniqueId}@gmail.com";

        // Register a new user with the role of "Branch Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"BranchManager\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient2.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all feedbacks
        HttpResponseMessage feedbackResponse = await _httpClient2.GetAsync("/api/ms/feedback");

        Console.WriteLine("Feedback Response: " + feedbackResponse);

        Assert.AreEqual(HttpStatusCode.OK, feedbackResponse.StatusCode);
    }


    [Test, Order(30)]
    public async Task Backend_MicroServices_Test_Get_All_Feedbacks_With_Token_By_Customer_Returns_HttpStatusCode_Forbidden()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"customer_{uniqueId}";
        string uniqueEmail = $"customer{uniqueId}@gmail.com";

        // Register a new user with the role of "Customer"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Customer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient2.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all feedbacks
        HttpResponseMessage feedbackResponse = await _httpClient2.GetAsync("/api/ms/feedback");

        Console.WriteLine("Feedback Response: " + feedbackResponse);

        Assert.AreEqual(HttpStatusCode.Forbidden, feedbackResponse.StatusCode);
    }


    [Test, Order(31)]
    public async Task Backend_MicroServices_Test_Get_All_Feedbacks_Without_Token_Returns_HttpStatusCode_Unauthorized()
    {
        // Make the GET request to retrieve all feedbacks without a token
        HttpResponseMessage feedbackResponse = await _httpClient2.GetAsync("/api/ms/feedback");

        Console.WriteLine("Feedback Response: " + feedbackResponse);

        Assert.AreEqual(HttpStatusCode.Unauthorized, feedbackResponse.StatusCode);
    }

    [Test, Order(32)]
    public async Task Backend_MicroServices_Test_Post_CreditCard_By_CreditCardOfficer_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"CreditCardOfficer\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        string uniqueTitle = Guid.NewGuid().ToString();

        // Use a dynamic and unique CardType for admin (appending timestamp)
        string uniqueCardType = $"creditcard_{uniqueTitle}";

        string creditCardJson = $"{{\"CardType\":\"{uniqueCardType}\",\"InterestRate\":10,\"CreditLimit\":1000000,\"AnnualFee\":10000,\"MinimumPaymentPercentage\":12,\"CashAdvanceFee\":3000,\"GracePeriodDays\":30,\"Status\":\"Active\",\"LatePaymentFee\":500}}";
        _httpClient4.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage creditCardResponse = await _httpClient4.PostAsync("/api/ms/creditcards",
        new StringContent(creditCardJson, Encoding.UTF8, "application/json"));

        Console.WriteLine("CreditCard Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.Ok, creditCardResponse.StatusCode);
    }

    [Test, Order(33)]
    public async Task Backend_MicroServices_Test_Post_CreditCard_By_Customer_Returns_Forbidden()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Customer\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        string uniqueTitle = Guid.NewGuid().ToString();

        // Use a dynamic and unique CardType for admin (appending timestamp)
        string uniqueCardType = $"creditcard_{uniqueTitle}";

        string creditCardJson = $"{{\"CardType\":\"{uniqueCardType}\",\"InterestRate\":10,\"CreditLimit\":1000000,\"AnnualFee\":10000,\"MinimumPaymentPercentage\":12,\"CashAdvanceFee\":3000,\"GracePeriodDays\":30,\"Status\":\"Active\",\"LatePaymentFee\":500}}";
        _httpClient4.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage creditCardResponse = await _httpClient4.PostAsync("/api/ms/creditcards",
        new StringContent(creditCardJson, Encoding.UTF8, "application/json"));

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.NotFound, creditCardResponse.StatusCode);
    }

    [Test, Order(34)]
    public async Task Backend_MicroServices_Test_Post_CreditCard_By_BranchManager_Returns_Forbidden()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"BranchManager\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        string uniqueTitle = Guid.NewGuid().ToString();

        // Use a dynamic and unique CardType for admin (appending timestamp)
        string uniqueCardType = $"creditcard_{uniqueTitle}";

        string creditCardJson = $"{{\"CardType\":\"{uniqueCardType}\",\"InterestRate\":10,\"CreditLimit\":1000000,\"AnnualFee\":10000,\"MinimumPaymentPercentage\":12,\"CashAdvanceFee\":3000,\"GracePeriodDays\":30,\"Status\":\"Active\",\"LatePaymentFee\":500}}";
        _httpClient4.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage creditCardResponse = await _httpClient4.PostAsync("/api/ms/creditcards",
        new StringContent(creditCardJson, Encoding.UTF8, "application/json"));

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.Forbidden, creditCardResponse.StatusCode);
    }

    [Test, Order(35)]
    public async Task Backend_MicroServices_Test_Get_All_CreditCards_With_Token_By_CreditCard_Officer_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardofficer_{uniqueId}";
        string uniqueEmail = $"creditcardofficer_{uniqueId}@gmail.com";

        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"CreditCardOfficer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient4.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient4.GetAsync("/api/ms/creditcards");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.OK, creditCardResponse.StatusCode);
    }

    [Test, Order(36)]
    public async Task Backend_MicroServices_Test_Get_All_Notifications_Without_Token_Returns_HttpStatusCode_Unauthorized()
    {
        // Make the GET request to retrieve all notifications without a token
        HttpResponseMessage notificationResponse = await _httpClient3.GetAsync("/api/ms/notifications");

        Console.WriteLine("Notification Response: " + notificationResponse);

        Assert.AreEqual(HttpStatusCode.Unauthorized, notificationResponse.StatusCode);
    }

    [Test, Order(37)]
    public async Task Backend_MicroServices_Test_Get_All_CreditCard_Applications_With_Token_By_BranchManager_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardmanager_{uniqueId}";
        string uniqueEmail = $"creditcardmanager_{uniqueId}@gmail.com";

        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"BranchManager\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient1.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient1.GetAsync("/api/ms/creditcardapplication");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.OK, creditCardResponse.StatusCode);
    }

    [Test, Order(38)]
    public async Task Backend_MicroServices_Test_Get_All_CreditCard_Applications_Without_Token_Returns_HttpStatusCode_Unauthorized()
    {
        // Make the GET request to retrieve all loans
        HttpResponseMessage creditCardResponse = await _httpClient1.GetAsync("/api/ms/creditcardapplication");

        Console.WriteLine("Credit Card Response: " + creditCardResponse);

        Assert.AreEqual(HttpStatusCode.Unauthorized, creditCardResponse.StatusCode);
    }

    [Test, Order(39)]
    public async Task Backend_MicroServices_Test_Get_All_CreditCard_Disbursements_With_Token_By_CreditCard_Officer_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"creditcardofficer_{uniqueId}";
        string uniqueEmail = $"creditcardofficer_{uniqueId}@gmail.com";

        // Register a new user with the role of "Loan Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"CreditCardOfficer\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient1.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loan disbursements
        HttpResponseMessage disbursementResponse = await _httpClient1.GetAsync("/api/ms/creditcarddisbursements");

        Console.WriteLine("Credit Card Disbursement Response: " + disbursementResponse);

        Assert.AreEqual(HttpStatusCode.OK, disbursementResponse.StatusCode);
    }

    [Test, Order(40)]
    public async Task Backend_MicroServices_Test_Get_All_CreditCard_Disbursements_With_Token_By_Branch_Manager_Returns_HttpStatusCode_OK()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName and Email for the test user
        string uniqueUsername = $"branchmanager_{uniqueId}";
        string uniqueEmail = $"branchmanager{uniqueId}@gmail.com";

        // Register a new user with the role of "Branch Manager"
        string registerRequestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"BranchManager\"}}";
        HttpResponseMessage registerResponse = await _httpClient.PostAsync("/api/register", new StringContent(registerRequestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await registerResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user to get the token
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
        string token = responseMap.token;

        Assert.IsNotNull(token);

        // Add the token to the request header
        _httpClient1.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        // Make the GET request to retrieve all loan disbursements
        HttpResponseMessage disbursementResponse = await _httpClient1.GetAsync("/api/ms/creditcarddisbursements");

        Console.WriteLine("CreditCard Disbursement Response: " + disbursementResponse);

        Assert.AreEqual(HttpStatusCode.OK, disbursementResponse.StatusCode);
    }
}
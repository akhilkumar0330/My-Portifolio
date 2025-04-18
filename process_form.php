<?php
// process_form.php - Form validation and processing script

// Initialize error array and result status
$errors = [];
$success = false;

// Check if the form was submitted using POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Validate name
    if (empty($_POST["name"])) {
        $errors["name"] = "Name is required";
    } elseif (strlen($_POST["name"]) < 2) {
        $errors["name"] = "Name must be at least 2 characters";
    } elseif (!preg_match("/^[a-zA-Z ]*$/", $_POST["name"])) {
        $errors["name"] = "Only letters and spaces allowed in name";
    }
    
    // Validate email
    if (empty($_POST["email"])) {
        $errors["email"] = "Email is required";
    } elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $errors["email"] = "Invalid email format";
    }
    
    // Validate subject
    if (empty($_POST["subject"])) {
        $errors["subject"] = "Subject is required";
    } elseif (strlen($_POST["subject"]) < 3) {
        $errors["subject"] = "Subject must be at least 3 characters";
    }
    
    // Validate mobile number
    if (empty($_POST["mobile"])) {
        $errors["mobile"] = "Mobile number is required";
    } elseif (!preg_match("/^[0-9]{10}$/", $_POST["mobile"])) {
        $errors["mobile"] = "Mobile number must be 10 digits";
    }
    
    // Validate message
    if (empty($_POST["message"])) {
        $errors["message"] = "Message is required";
    } elseif (strlen($_POST["message"]) < 10) {
        $errors["message"] = "Message must be at least 10 characters";
    }
    
    // Validate agreement checkbox
    if (!isset($_POST["agreement"])) {
        $errors["agreement"] = "You must agree to the terms and conditions";
    }
    
    // If no errors, process the form
    if (empty($errors)) {
        // Clean and sanitize the data
        $name = htmlspecialchars(trim($_POST["name"]));
        $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
        $subject = htmlspecialchars(trim($_POST["subject"]));
        $mobile = htmlspecialchars(trim($_POST["mobile"]));
        $message = htmlspecialchars(trim($_POST["message"]));
        
        // Set success message
        $success = true;
        
        // Here you would typically:
        // 1. Store in database
        // 2. Send email notification
        // 3. Log the submission
        
        // Example of sending an email (uncomment to use)
        /*
        $to = "akhil.kumar@example.com";
        $headers = "From: $email";
        $email_subject = "Contact Form: $subject";
        $email_body = "You have received a new message from your website contact form.\n\n".
                      "Name: $name\n".
                      "Email: $email\n".
                      "Phone: $mobile\n\n".
                      "Message:\n$message";
                      
        mail($to, $email_subject, $email_body, $headers);
        */
    }
}

// Return JSON response for AJAX requests
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'errors' => $errors
    ]);
    exit;
}

// For normal form submissions, redirect or show results
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($success) {
        // Option 1: Redirect to thank you page
        header("Location: thank_you.html");
        exit;
    } else {
        // Option 2: Return to form with errors
        // You'll need to implement a way to pass errors back to the form
        // For simplicity, we'll just output them here
        echo "<div class='alert alert-danger'>";
        echo "<h4>Please correct the following errors:</h4>";
        echo "<ul>";
        foreach ($errors as $error) {
            echo "<li>$error</li>";
        }
        echo "</ul>";
        echo "<a href='contact.html'>Go back to the form</a>";
        echo "</div>";
    }
} else {
    // If someone tries to access this file directly, redirect to contact form
    header("Location: contact.html");
    exit;
}
?>
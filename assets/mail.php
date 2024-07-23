<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please fill out the form correctly.";
        exit;
    }

    $formcontent = "From: $name\nMessage: $message";
    $recipient = "stevenlecontact@gmail.com";
    $subject = "Contact Form";
    $mailheader = "From: $email\r\n";

    if (mail($recipient, $subject, $formcontent, $mailheader)) {
        http_response_code(200);
        echo "Thank You!";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>

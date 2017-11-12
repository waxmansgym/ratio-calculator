<?php 
 
  // Get the request JSON  
  $request = json_decode(trim(file_get_contents("php://input")), true);
 
  // Only accept waxmansgym.com or waxmans.r-c-v.com domains
  $domain_regex = "/(http:\/\/)?(www.)?(waxmansgym.com|waxmans.r-c-v.com)/";
  if(!preg_match($domain_regex, $request['destination'])) {
    header("HTTP/1.1 400 Invalid Request");
    exit(0);
  }
   
  $domain_data["fullName"] = "wxmn.co";
  $post_data["destination"] = $request['destination'];
  $post_data["domain"] = $domain_data;
  //$post_data["slashtag"] = "WHATEVER_SLASHTAB";
  //$post_data["title"] = "WHATEVER TITLE";
  $ch = curl_init("https://api.rebrandly.com/v1/links");
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      "apikey: YOUR_API_KEY_HERE",
      "Content-Type: application/json"
  ));
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post_data));
  $result = curl_exec($ch);
  curl_close($ch);
  $response = json_decode($result, true);
  
  $data->shortLinkURL = $response["shortUrl"];

  header('Content-type: application/json');
  echo json_encode( $data );

?>

import styled from "styled-components";

// Terms of privacy for the footer
const TermsPrivacy = () => {
  return (
    <Container>
      <Content>
        <Button href="http://localhost:3000/"> RETURN TO SHOP</Button>
        <h1>Terms & Privacy</h1>
        <WrapperText>
          <p>Effective as of 11 October 2022</p>

          <h3>Acceptance of the Website Terms and Conditions of Use</h3>

          <Text>
            These website terms and conditions of use for Eletronics Multiverse,
            constitute a legal agreement and are entered into by and between you
            and Electronics Multiverse.
            <b>("Company," "we," "us," "our")</b>. The following terms and
            conditions, together with any documents and/or additional terms they
            expressly incorporate by reference
            <b>(collectively, these "Terms and Conditions")</b>, govern your
            access to and use, including any content, functionality, and
            services offered on or through Electronics Multiverse{" "}
            <b>(the "Website")</b>.
          </Text>

          <Text>
            <b>
              BY USING THE WEBSITE, YOU ACCEPT AND AGREE TO BE BOUND AND COMPLY
              WITH THESE TERMS AND CONDITIONS AND OUR PRIVACY POLICY.
            </b>
          </Text>

          <Text>
            By using this Website, you represent and warrant that you are the
            legal age of majority under applicable law to form a binding
            contract with the Company and meet all of the foregoing eligibility
            requirements. If you do not meet all of these requirements, you must
            not access or use the Website.
          </Text>

          <h3>Modifications to the Terms and Conditions and to the Website</h3>

          <Text>
            We reserve the right in our sole discretion to revise and update
            these terms and conditions from time to time. Any and all such
            modifications are effective immediately upon posting and apply to
            all access to and continued use of the Website. You agree to
            periodically review the terms and conditions in order to be aware of
            any such modifications and your continued use shall be your
            acceptance of these. The information and material on this Website,
            and the Website, may be changed, withdrawn, or terminated at any
            time in our sole discretion without notice. We will not be liable
            if, for any reason, all or any part of the Website is restricted to
            users or unavailable at any time or for any period.
          </Text>
          <h3>Your Use of the Website and Account Set-Up and Security</h3>

          <Text>
            The security of your personal information is very important to us.
            We use physical, electronic, and administrative measures designed to
            secure your personal information from accidental loss and from
            unauthorized access, use, alteration, and disclosure.
          </Text>

          <Text>
            The safety and security of your information also depends on you.
            Users are responsible for obtaining their own access to the Website.
            Users are required to ensure that all persons who access the Website
            through a user's internet connection are aware of these Terms and
            Conditions and comply with them. The Website, including content or
            areas of the Website, may require user registration. It is a
            condition of your use of the Website that all the information you
            provide on the Website is correct, current, and complete.
          </Text>

          <Text>
            Unfortunately, the transmission of information via the Internet is
            not completely secure. Although we do our best to protect your
            personal information, we cannot guarantee the security of your
            personal information transmitted to our Website. Any transmission of
            personal information is at your own risk. We are not responsible for
            circumvention of any privacy settings or security measures contained
            on the Website.
          </Text>

          <Text>
            Any username, password, or any other piece of information chosen by
            you, or provided to you as part of our security procedures, must be
            treated as confidential, and you must not disclose it to any other
            person or entity. You must exercise caution when accessing your
            account from a public or shared computer so that others are not able
            to view or record your password or other personal information. You
            understand and agree that should you be provided an account, your
            account is personal to you and you agree not to provide any other
            person with access to this Website or portions of it using your
            username, password, or other security information. You agree to
            notify us immediately of any unauthorized access to or use of your
            username or password or any other breach of security. You also agree
            to ensure that you logout from your account at the end of each
            session. You are responsible for any password misuse or any
            unauthorized access.
          </Text>
        </WrapperText>
      </Content>
    </Container>
  );
};
const Container = styled.div`
  padding: 20px;
  margin-top: 90px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
`;
const WrapperText = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.p`
  line-height: 30px;
`;
const Button = styled.a`
  text-decoration: none;
  color: black;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  position: relative;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export default TermsPrivacy;

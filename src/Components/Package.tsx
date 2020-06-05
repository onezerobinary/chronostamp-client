import React, { useState } from 'react';
import styled from 'styled-components';
import useModal from 'use-react-modal';
import { CardElement } from '@stripe/react-stripe-js';
import Auth0 from '../Auth/Auth';
import { Payment, doPayment } from '../API';

interface PackageProps {
  title: string;
  amount: string;
  stripe: any;
  elements: any;
}

export const Package: React.FC<PackageProps> = (props: PackageProps) => {
  let nickname = Auth0.profile.nickname;
  let sub = Auth0.profile.sub;

  // Declare a local state to used internally by this component
  const [payed, setPayed] = useState(false);

  // Use modal to show a pop up
  const { isOpen, openModal, closeModal, Modal, backdropRef } = useModal();

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // handle payment request to the backend
    const { stripe, elements } = props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      const payment: Payment = {
        token: result.token,
        amount: props.amount,
        chronoStampID: nickname,
      };

      let isPayed = doPayment(payment);

      console.log(isPayed);

      if (isPayed) {
        setPayed(true);
      }

      // redirect, clear inputs, thank alert ...
    }
  };

  return (
    <Container>
      <Title>{props.title}</Title>
      <Amount>{props.amount}</Amount>
      <Button onClick={openModal}>Buy now!</Button>
      {isOpen && (
        <Modal>
          <PaymentContainer>
            <div className="Close">
              <ButtonClose onClick={closeModal}>x</ButtonClose>
            </div>
            {!payed && (
              <Form>
                <form
                  onSubmit={(element: React.ChangeEvent<HTMLFormElement>) =>
                    handleSubmit(element)
                  }
                >
                  <PaymentTitle>{props.title}</PaymentTitle>
                  <Amount>Amount: {props.amount}</Amount>
                  <Description>
                    Please insert the details of your credit card
                  </Description>
                  <PaymentCard>
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '10px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </PaymentCard>
                  <Button>Send Payment</Button>
                </form>
              </Form>
            )}
            {payed && (
              <Payed>
                <PaymentTitle>Thank you! 🚀</PaymentTitle>
                <Description>Payment Successfully Received</Description>
              </Payed>
            )}
          </PaymentContainer>
        </Modal>
      )}
    </Container>
  );
};

const PaymentContainer = styled.div({
  background: 'rgb(0, 0, 0, 0.2)',
  width: '350px',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  paddingLeft: '8px',
  paddingRight: '8px',
});

const Form = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginBottom: '6px',
  marginTop: '6px',
  background: '#009ee3',
  borderRadius: '6px',
  paddingLeft: '8px',
  paddingRight: '8px',
});

const Payed = styled(Form)({
  background: '#C6C36F',
});

const PaymentTitle = styled.div({
  fontSize: '13px',
  color: '#282c34',
});

const Amount = styled(PaymentTitle)({
  fontSize: '12px',
});

const Description = styled(PaymentTitle)({
  fontSize: '8px',
});

const PaymentCard = styled.div({
  marginTop: '8px',
  marginBottom: '8px',
});

const Container = styled.div({
  background: '#cd495a',
  width: '120px',
  height: '100px',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Title = styled.div({
  color: '#1c436a',
});

const ButtonClose = styled.button({
  background: 'rgb(0, 0, 0, 0.6)',
  color: '#cd495a',
  marginTop: '1%',
  marginRight: '1%',
  border: 'none',
  borderRadius: '10px',
});

const Button = styled.button({
  background: '#1c436a',
  borderRadius: 5,
  border: 'none',
  width: '100px',
  fontSize: '10px',
  color: '#fff',
  ':hover': {
    background: '#009ee3',
    color: '#1c436a',
  },
  marginTop: '10px',
  marginBottom: '10px',
});

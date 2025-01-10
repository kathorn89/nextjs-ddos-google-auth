import styled from 'styled-components';

export const Text = styled.span`
  font-size: ${(props) =>
    props.h1
      ? '32px'
      : props.h2
      ? '24px'
      : props.h3
      ? '20px'
      : props.h4 || props.sub1
      ? '18px'
      : props.sub2 || props.body16
      ? '16px'
      : props.sub3 || props.body14 || props.button
      ? '14px'
      : props.sub4 || props.small12
      ? '12px'
      : undefined};
  line-height: ${(props) =>
    props.h1
      ? '40px'
      : props.h2
      ? '32px'
      : props.h3
      ? '26px'
      : props.h4 ||
        props.sub1 ||
        props.sub2 ||
        props.sub3 ||
        props.body16 ||
        props.body14
      ? '24px'
      : props.button
      ? '20px'
      : props.sub4 || props.small12
      ? '16px'
      : undefined};
  font-weight: ${(props) =>
    props.h1
      ? '600'
      : props.h2 ||
        props.h3 ||
        props.h4 ||
        props.sub1 ||
        props.sub2 ||
        props.sub3 ||
        props.sub4
      ? '600'
      : props.body16 || props.body14 || props.button
      ? '300'
      : props.small12
      ? '300'
      : undefined};
  text-transform: ${(props) => props.capitalize && 'capitalize'};
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
  font-family: Figtree, 'Noto Sans Thai', sans-serif;
`;

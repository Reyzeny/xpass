import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import navbar from '@/components/Navbar.vue';
import VerifyOTP from '@/views/VerifyOTP.vue';

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message';
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg },
//     });
//     expect(wrapper.text()).to.include(msg);
//   });
// });
const localVue = createLocalVue();
localVue.component('navbar', navbar);

describe('VerifyOTP.vue', () => {
  let VerifyOTPOnWebBrowser;
  let props;
  before(() => {
    props = {
      email: 'pelumzeny10@gmail.com',
    };
    VerifyOTPOnWebBrowser = shallowMount(VerifyOTP, {
      propsData: props,
      localVue,
    });
  });
  it('shows account validation as the header', () => {
    const header = VerifyOTPOnWebBrowser.find('.card-title');
    const headerText = 'Account Validation';
    expect(header.text()).equal(headerText);
  });
  it('shows sub title information', () => {
    const subHeader = VerifyOTPOnWebBrowser.find('.card-subtitle');
    const subHeaderText = `Enter the 6 digit confirmation code sent to your email ${props.email}`;
    expect(subHeader.text()).equal(subHeaderText);
  });
  // it('shows enter otp text above the input field', ()=>{
  //   const
  // });
  it('button has continue rendered', () => {
    const buttonContinue = VerifyOTPOnWebBrowser.find('#btnContinue');
    const buttonContinueText = 'Continue';
    expect(buttonContinue.text()).equal(buttonContinueText);
  });
  //
  // it('renders otp as the input field placeholder');
  // it('shows empty otp input field when opened');
  // it('shows error when continue button clicked without entering an otp');
  // it('shows error when continue button clicked and otp is wrong');
  // it('shows verified when otp is correct');
});

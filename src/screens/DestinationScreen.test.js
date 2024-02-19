// BEGIN: Test case 1
const mockNavigation = {
  goBack: jest.fn()
};
const wrapper = shallow(<DestinationScreen navigation={mockNavigation} />);
wrapper.find(Icon).props().onPress();
expect(mockNavigation.goBack).toHaveBeenCalled();
// END: Test case 1
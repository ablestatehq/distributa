export const mockSpinnerProps = {
  basic: {
    variant: "default",
    size: "md",
    color: "primary",
  },
  withChildren: {
    variant: "circular",
    size: "lg",
    color: "secondary",
    children: "Loading...",
    testId: "spinner-with-children",
  },
  withCustomStyles: {
    variant: "dots",
    size: "sm",
    color: "white",
    className:
      "animate-pulse flex items-center space-x-2 p-4 bg-gray-100 rounded-md",
  },
};

export const mockSpinnerContext = {
  loading: false,
  setLoading: jest.fn(),
  spinnerProps: mockSpinnerProps.basic,
};

export const mockAsyncOperation = {
  success: jest
    .fn()
    .mockResolvedValue({ success: true, data: { name: "david" } }),
  error: jest.fn().mockRejectedValue(new Error("Failed operation")),
  loading: jest
    .fn()
    .mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    ),
};

export const mockHandlers = {
  onStart: jest.fn(),
  onStop: jest.fn(),
  onComplete: jest.fn(),
};

### Guide to Creating Modals Using the ReactPortal and Modal Components

This guide explains how to use the newly introduced `ReactPortal` and `Modal` components to create modular, reusable modals in your React application.

### Step 1: Understanding the Components

- **ReactPortal**: A helper component that renders children into a specified DOM node outside the main DOM hierarchy.
- **Modal**: A reusable layout component for displaying modal overlays using `ReactPortal`, providing features such as closing modals via Escape key or a dedicated close button.

### Step 2: Creating a Modal

#### Import Required Components

```tsx
import React, { FC, useState } from 'react';
import Modal from '@/components/layouts/overlays/Modal';
```

#### Set up Modal State

Use React state to manage modal visibility:

```tsx
const [isOpen, setIsOpen] = useState(false);

const handleOpen = () => setIsOpen(true);
const handleClose = () => setIsOpen(false);
```

#### Implement Modal in Your Component

Here's a complete example aligning with the provided structure:

```tsx
const DivisionPage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Reusable Sidebar */}
      <AdminSlidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">Division Details</h2>
          <button
            className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
            onClick={handleOpen}
          >
            New
          </button>
        </div>

        {isOpen && (
          <Modal isOpen={isOpen} handleClose={handleClose} title="Add Division">
            <div className="p-6">
              <form action="" className="space-y-4">
                <div>
                  <label htmlFor="division" className="block text-sm font-semibold text-gray-600">Division Name</label>
                  <input type="text" id="division" placeholder="Enter Division Name" className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label htmlFor="population" className="block text-sm font-semibold text-gray-600">Population</label>
                  <input type="number" id="population" placeholder="Enter Population" className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]">Add Division</button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DivisionPage;
```

### Step 3: Using Modal Features

- **Close Button**: Clicking the built-in close button triggers the `handleClose` callback.
- **Escape Key Support**: Pressing Escape automatically closes the modal by calling `handleClose`.

### Summary

With the `ReactPortal` and `Modal` components, you now have a robust and modular approach to handle modals efficiently throughout your React application.


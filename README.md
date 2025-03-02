# alevent - A Lightweight Event Bus for JavaScript & TypeScript

`alevent` is a **lightweight and flexible event bus library** for handling communication between different parts of your application. It supports two modes of event-driven communication:

- **AppEventBus**: For applications that exist on the **same domain** and are bundled together at build time (e.g., widgets, micro-frontends within a single app).
- **GlobalEventBus**: For applications that exist on **different domains** (e.g., iframes, cross-origin communication).

## 🚀 Installation
```sh
npm install alevent
```

---

## 🔹 Usage

### 1️⃣ **Using `AppEventBus` for Same-Domain Communication**
Use `AppEventBus` when components, widgets, or micro-frontends **exist within the same domain** and can communicate directly in memory.

#### 📌 **Example: Communication Between Widgets**
```typescript
import { AppEventBus } from 'alevent';

// Create an instance of AppEventBus
const appBus = new AppEventBus<string>();

// Widget A: Subscribe to an event
appBus.on('userLoggedIn', (username) => {
  console.log(`User logged in: ${username}`);
});

// Widget B: Emit an event
appBus.emit('userLoggedIn', 'Alice');
```
✅ **Fast and efficient** – Uses in-memory communication.
✅ **Ideal for single-page applications (SPAs), widgets, and modules.**

---

### 2️⃣ **Using `GlobalEventBus` for Cross-Domain Communication**
Use `GlobalEventBus` when applications **reside on different domains** (e.g., a parent app communicating with an iframe).

#### 📌 **Example: Communication Between a Parent App and an Iframe**
```typescript
import { GlobalEventBus } from 'alevent';

// Parent App: Emit an event
const globalBus = new GlobalEventBus<string>();
globalBus.emit('iframeMessage', 'Hello from Parent');

// Iframe App: Listen for the event
const iframeBus = new GlobalEventBus<string>();
iframeBus.on('iframeMessage', (message) => {
  console.log(`Received in iframe: ${message}`);
});
```
✅ **Allows cross-origin communication** (e.g., between an iframe and its parent page).  
✅ **Uses `window.dispatchEvent` for event propagation.**

---

## 📌 Features
- 🚀 **Supports Ordered Handlers** – Event handlers execute in the order they were added.
- 🛑 **Propagation Control** – Listeners can stop event propagation by returning `false`.
- 🏗 **Lightweight & Fast** – Optimized for minimal performance overhead.
- 🔄 **Supports Dynamic Subscription & Removal** – Easily add or remove event listeners at runtime.

---

## ✅ API Reference

### **1. AppEventBus** (For Same-Domain Communication)
#### 🔹 `on(event: string, listener: (data: T) => boolean | void, index?: number): void`
Registers an event listener with an optional order index.

#### 🔹 `off(event: string, listener: (data: T) => boolean | void): void`
Removes an event listener.

#### 🔹 `emit(event: string, data: T): void`
Emits an event, triggering all subscribed listeners.

### **2. GlobalEventBus** (For Cross-Domain Communication)
#### 🔹 `on(event: string, listener: (data: T) => boolean | void, index?: number): void`
Registers an event listener on the `window` object.

#### 🔹 `off(event: string, listener: (data: T) => boolean | void): void`
Removes an event listener from the `window` object.

#### 🔹 `emit(event: string, data: T): void`
Emits an event using `window.dispatchEvent`.

---


## 📝 License
MIT License. Feel free to contribute and use `alevent` in your projects! 🚀

# almentor

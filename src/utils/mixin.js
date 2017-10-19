export default function mixin(target, source) {
  // assign properties
  Object.assign(target, source);

  // assign functions
  target = target.__proto__; 
  source = source.__proto__;
  Object.getOwnPropertyNames(source).forEach((name) => {
    if (name !== "constructor") Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
  });
} 
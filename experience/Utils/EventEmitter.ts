import type { CallBacks, EventEmitterType, NewName } from "~/types/types";

export default class EventEmitter implements EventEmitterType {
  callbacks: CallBacks;

  constructor() {
    this.callbacks = {};
    this.callbacks.base = {};
  }

  on(_names: string, callback: Function): EventEmitterType | boolean {
    // Errors
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong names");
      return false;
    }

    if (typeof callback === "undefined") {
      console.warn("wrong callback");
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach((_name: string) => {
      // Resolve name
      const name: NewName = this.resolveName(_name);

      // Create namespace if not exist
      if (
        !(this.callbacks[name.namespace as keyof CallBacks] instanceof Object)
      )
        this.callbacks[name.namespace as keyof CallBacks] = {};

      // Create callback if not exist
      if (
        !(
          this.callbacks[name.namespace as keyof CallBacks]?.[
            name.value as string
          ] instanceof Array
        )
      )
        this.callbacks[name.namespace as keyof CallBacks][
          name.value as string
        ] = [];

      // Add callback
      this.callbacks[name.namespace as keyof CallBacks][
        name.value as string
      ].push(callback);
    });

    return this;
  }

  off(_names: string): EventEmitterType | boolean {
    // Errors
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong name");
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = this.resolveName(_name);

      // Remove namespace
      if (name.namespace !== "base" && name.value === "") {
        delete this.callbacks[name.namespace as keyof CallBacks];
      }

      // Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === "base") {
          // Try to remove from each namespace
          for (const namespace in this.callbacks) {
            if (
              this.callbacks[namespace] instanceof Object &&
              this.callbacks[namespace][name.value] instanceof Array
            ) {
              delete this.callbacks[namespace][name.value];

              // Remove namespace if empty
              if (Object.keys(this.callbacks[namespace]).length === 0)
                delete this.callbacks[namespace];
            }
          }
        }

        // Specified namespace
        else if (
          this.callbacks[name.namespace as keyof CallBacks] instanceof Object &&
          this.callbacks[name.namespace as keyof CallBacks][
            name.value as string
          ] instanceof Array
        ) {
          delete this.callbacks[name.namespace as keyof CallBacks][
            name.value as string
          ];

          // Remove namespace if empty
          if (
            Object.keys(this.callbacks[name.namespace as keyof CallBacks])
              .length === 0
          )
            delete this.callbacks[name.namespace as keyof CallBacks];
        }
      }
    });

    return this;
  }

  trigger(_name: string, _args?: any) {
    // Errors
    if (typeof _name === "undefined" || _name === "") {
      console.warn("wrong name");
      return false;
    }

    let finalResult: Object | null = null;
    let result: Object | null = null;

    // Default args
    const args = !(_args instanceof Array) ? [] : _args;

    // Resolve names (should on have one event)
    let name: string[] = this.resolveNames(_name);

    // Resolve name
    let newName = this.resolveName(name[0]);

    // Default namespace
    if (newName.namespace === "base") {
      // Try to find callback in each namespace
      for (const namespace in this.callbacks) {
        if (
          this.callbacks[namespace] instanceof Object &&
          this.callbacks[namespace][newName.value] instanceof Array
        ) {
          this.callbacks[namespace][newName.value].forEach(
            (callback: () => {}) => {
              result = callback.apply(callback, args as any);

              if (typeof finalResult === "undefined") {
                finalResult = result;
              }
            }
          );
        }
      }
    }

    // Specified namespace
    else if (
      this.callbacks[newName.namespace as keyof CallBacks] instanceof Object
    ) {
      if (newName.value === "") {
        console.warn("wrong name");
        return this;
      }

      this.callbacks[newName.namespace as keyof CallBacks][
        newName.value as string
      ].forEach((callback: () => {}) => {
        result = callback.apply(callback, args as any);

        if (typeof finalResult === "undefined") finalResult = result;
      });
    }

    return finalResult;
  }

  resolveNames(_names: string): string[] {
    let names = _names;
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, "");
    names = names.replace(/[,/]+/g, " ");
    return names.split(" ");
  }

  resolveName(name: string): NewName {
    const newName: NewName = {};
    const parts = name.split(".");

    newName.original = name;
    newName.value = parts[0];
    newName.namespace = "base"; // Base namespace

    // Specified namespace
    if (parts.length > 1 && parts[1] !== "") {
      newName.namespace = parts[1];
    }

    return newName;
  }
}

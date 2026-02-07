export { };

declare global {
    interface Navigator {
        deviceMemory?: number;
        hardwareConcurrency?: number;
    }
}

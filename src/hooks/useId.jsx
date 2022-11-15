export function useId() {    
    function generateId(size) {
        let id = ""
        for (let i = 0; i < size; i++) id += Math.random().toString(36).substring(2, 18)
        return id;
    }

    return [generateId];
}
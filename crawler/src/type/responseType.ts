export class ApiResponse {
    // status: number;
    // statusText: string;
    // data: any;

    // constructor(status: number, statusText: string, data: any = null) {
    //     this.status = status;
    //     this.statusText = statusText;
    //     this.data = data;
    // }
    constructor(
        public status: number,
        public statusText: string,
        public data: any
    ) { }

    static success(status: number, message = "success", data: any) {
        return new ApiResponse(status, message, data);
    }
    static error(status: number, message = "error", data: any) {
        return new ApiResponse(status, message, data);
    }
}
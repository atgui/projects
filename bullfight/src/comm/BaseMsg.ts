/**
 *
 * @author 
 *
 */
class BaseMsg {
	public constructor(value:string) {
        this.url = value;
	}
	
    public url: string;
    
    public actionid: number;
    
    public parameters: Object;
}

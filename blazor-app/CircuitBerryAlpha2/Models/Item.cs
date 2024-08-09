namespace CircuitBerryAlpha2.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }

        public string ToString()
        {
            return $"{Id}-{Name}-{Price}";
        }
    }
}

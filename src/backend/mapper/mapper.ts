export default interface Mapper<S, T> {
    mapTo(from: S): T;
}
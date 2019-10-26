FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
RUN  apt-get update \
    && curl -sL https://deb.nodesource.com/setup_13.x | bash - \
    && apt-get install -y nodejs \
	&& npm -v 
WORKDIR /src
COPY ["DockerPresentation.csproj", "DockerPresentation/"]
RUN cat "DockerPresentation/DockerPresentation.csproj"
RUN dotnet restore "DockerPresentation/DockerPresentation.csproj"
WORKDIR "/src/DockerPresentation"
COPY . .
RUN ls -l
RUN dotnet build "DockerPresentation.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DockerPresentation.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DockerPresentation.dll"]